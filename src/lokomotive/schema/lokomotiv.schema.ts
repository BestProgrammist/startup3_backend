// workshop.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Organization } from 'src/organization/schema/organization.schema';

export type LokomotivDocument = HydratedDocument<Lokomotiv>;

@Schema({ timestamps: true })
export class Lokomotiv {
  @Prop({ required: true })
  series: string;

  @Prop({ required: true })
  number: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  })
  organization: Organization;
}

export const LokomotivSchema = SchemaFactory.createForClass(Lokomotiv);
