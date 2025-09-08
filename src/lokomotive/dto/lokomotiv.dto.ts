import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateLokomotivDto {
  @IsString()
  @IsNotEmpty()
  series: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsMongoId()
  @IsNotEmpty()
  organization: Types.ObjectId;
}
