import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDto } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUsers(): Promise<UserDocument[]> {
    const existUser = await this.userModel.find();
    return existUser;
  }
  async editUser(_id: string, data: userDto): Promise<UserDocument | null> {
    const editedUser = await this.userModel.findByIdAndUpdate(_id, data);
    return editedUser;
  }
  async delete(_id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(_id);
    return { message: `Foydalanuvchi - ${deletedUser?.firstname} o'chirildi` };
  }
}
