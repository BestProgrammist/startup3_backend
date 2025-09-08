import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { Organization, OrganizationSchema } from './schema/organization.schema';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
    ]),
  ],
})
export class OrganizationModule {}
