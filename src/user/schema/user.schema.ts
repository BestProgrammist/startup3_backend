import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import type { UserRole } from './user.interface';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  email: string;
  @Prop({ required: true })
  firstname: string;
  @Prop({ required: true })
  lastname: string;
  @Prop({ required: true })
  organization: Types.ObjectId;
  @Prop({ required: true })
  workshop: Types.ObjectId;
  @Prop({ required: true })
  password: string;
  @Prop()
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
