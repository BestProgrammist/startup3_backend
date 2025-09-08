import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class createOrganizationDto {
  @IsNotEmpty()
  organ_name: string;
  @IsNotEmpty()
  organ_desc: string;
}

export class editOrganizationDto {
  @IsNotEmpty()
  _id: Types.ObjectId;
  @IsNotEmpty()
  organ_name: string;
  @IsNotEmpty()
  organ_desc: string;
}
