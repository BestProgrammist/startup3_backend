import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtSerevice: JwtService,
  ) {}

  async register(dto: registerDto) {
    const isExist = await this.isExistUser(dto.email);
    if (isExist) throw new BadRequestException('This email already exists');
    const salt = await genSalt(10);
    const hashedPassword = await hash(dto.password, salt);
    const newUser = await this.userModel.create({
      ...dto,
      password: hashedPassword,
      organization: new Types.ObjectId(dto.organization),
      workshop: new Types.ObjectId(dto.workshop),
    });
    const token = await this.issueTokenPair(String(newUser._id));
    const user = this.getUserdata(newUser);
    return { user: user, ...token };
  }

  async login(dto: loginDto) {
    const existUser = await this.isExistUser(dto.email);
    if (!existUser) throw new BadRequestException('User not found');
    const issamePassword = await compare(dto.password, existUser.password);
    if (!issamePassword) throw new BadRequestException('Password is incorrect');
    const token = await this.issueTokenPair(String(existUser._id));
    const user = this.getUserdata(existUser);
    return { user: user, ...token };
  }

  async getNewTokens({ refreshToken }: TokenDto) {
    if (!refreshToken) throw new UnauthorizedException('Please signIn!');
    const result = await this.jwtSerevice.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid token or expired!');
    const user = await this.userModel.findById(result._id);
    if (!user) throw new UnauthorizedException('Cannot find this user');
    const token = await this.issueTokenPair(String(user._id));
    return { user: this.getUserdata(user), ...token };
  }

  async isExistUser(email: string): Promise<UserDocument | null> {
    const existUser = await this.userModel.findOne({ email });
    return existUser;
  }

  async issueTokenPair(userId: string) {
    const data = { _id: userId };
    const refreshToken = await this.jwtSerevice.signAsync(data, {
      expiresIn: '15d',
    });
    const accessToken = await this.jwtSerevice.signAsync(data, {
      expiresIn: '1h',
    });
    return { refreshToken, accessToken };
  }

  getUserdata(user: UserDocument) {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      organization: user.organization,
      workshop: user.workshop,
    };
  }
}
