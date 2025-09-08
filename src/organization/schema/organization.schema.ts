import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrganDocument = HydratedDocument<Organization>;

@Schema({ timestamps: true })
export class Organization {
  @Prop({ required: true })
  organ_name: string;

  @Prop({ required: false })
  organ_desc: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
