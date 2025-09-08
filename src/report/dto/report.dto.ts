import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
export type ReportStatus = 'ready' | 'broken' | 'installed';
export class createReportDto {
  @IsNotEmpty()
  workstatus: ReportStatus;

  @IsNotEmpty()
  worklocation: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  magazinelocation: Types.ObjectId;

  @IsNotEmpty()
  worker: string;

  @IsNotEmpty()
  workdate: Date;

  @IsNotEmpty()
  instrument: string;

  @IsNotEmpty()
  instrument_location: string;
}

export class editReportDto {
  @IsNotEmpty()
  _id: Types.ObjectId;
  @IsNotEmpty()
  workstatus: ReportStatus;

  @IsNotEmpty()
  worklocation: string;

  @IsNotEmpty()
  magazinelocation: Types.ObjectId;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  worker: string;

  @IsNotEmpty()
  workdate: Date;

  @IsNotEmpty()
  instrument: string;

  @IsNotEmpty()
  instrument_location: string;
}
