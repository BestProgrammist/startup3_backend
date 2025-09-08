// journal.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Workshop } from 'src/workshop/schema/workshop.schema';

export type MagazineDocument = HydratedDocument<Magazine>;

@Schema({ timestamps: true })
export class Magazine {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workshop',
    required: true,
  })
  workshop: Workshop;
}

export const MagazineSchema = SchemaFactory.createForClass(Magazine);
