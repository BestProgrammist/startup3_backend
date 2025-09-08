// workshop.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Organization } from 'src/organization/schema/organization.schema';

export type WorkshopDocument = HydratedDocument<Workshop>;

@Schema({ timestamps: true })
export class Workshop {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  })
  organization: Organization;
}

export const WorkshopSchema = SchemaFactory.createForClass(Workshop);
