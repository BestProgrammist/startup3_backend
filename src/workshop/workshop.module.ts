import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Magazine, MagazineSchema } from 'src/magazine/schema/magazine.schema';
import { Workshop, WorkshopSchema } from './schema/workshop.schema';
import { WorkshopController } from './workshop.controller';
import { WorkshopService } from './workshop.service';

@Module({
  controllers: [WorkshopController],
  providers: [WorkshopService],
  imports: [
    MongooseModule.forFeature([
      { name: Workshop.name, schema: WorkshopSchema },
      { name: Magazine.name, schema: MagazineSchema },
    ]),
  ],
  exports: [WorkshopService],
})
export class WorkshopModule {}
