import { Types } from 'mongoose';
import { UserRole } from '../schema/user.interface';

export class userDto {
  email: string;
  firstname: string;
  lastname: string;
  organization: Types.ObjectId;
  workshop: Types.ObjectId;
  password: string;
  role: UserRole;
}
