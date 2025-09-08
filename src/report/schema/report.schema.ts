// workshop.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReportDocument = HydratedDocument<Report>;

@Schema({ timestamps: true })
export class Report {
  @Prop({ required: true })
  workstatus: 'ready' | 'broken' | 'installed';

  @Prop({ required: true })
  worklocation: string;

  @Prop({ required: true })
  magazinelocation: Types.ObjectId;

  @Prop({ required: true })
  worker: string;

  @Prop({ required: true })
  workdate: Date;

  @Prop({ required: true })
  instrument: string;

  @Prop({ required: true })
  instrument_location: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
