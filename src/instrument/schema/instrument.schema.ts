// workshop.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type InstrumentDocument = HydratedDocument<Instrument>;

@Schema({ timestamps: true })
export class Instrument {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  serialNumber: string;

  @Prop({ required: true })
  status: 'created' | 'ready' | 'broken' | 'installed';

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  lastActionBy: string;

  @Prop({ required: true })
  locationId: Types.ObjectId;

  @Prop({ required: true })
  workshop: Types.ObjectId;

  @Prop({ required: true })
  magazine: Types.ObjectId;
}

export const InstrumentSchema = SchemaFactory.createForClass(Instrument);
