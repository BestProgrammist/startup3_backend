import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateInstrumentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  lastActionBy: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  locationId: Types.ObjectId;

  @IsNotEmpty()
  workshop: Types.ObjectId;

  @IsNotEmpty()
  magazine: Types.ObjectId;

  @IsNotEmpty()
  fixperiod: string;
}
