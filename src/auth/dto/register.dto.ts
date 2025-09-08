import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Types } from 'mongoose';

export class registerDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  firstname: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  lastname: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
  @IsNotEmpty()
  @MinLength(4)
  organization: Types.ObjectId;
  @IsNotEmpty()
  @MinLength(4)
  workshop: Types.ObjectId;
}
