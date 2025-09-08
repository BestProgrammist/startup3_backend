import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Instrument,
  InstrumentSchema,
} from 'src/instrument/schema/instrument.schema';
import { Workshop, WorkshopSchema } from 'src/workshop/schema/workshop.schema';
import { MagazineController } from './magazine.controller';
import { MagazineService } from './magazine.service';
import { Magazine, MagazineSchema } from './schema/magazine.schema';

@Module({
  controllers: [MagazineController],
  providers: [MagazineService],
  imports: [
    MongooseModule.forFeature([
      { name: Workshop.name, schema: WorkshopSchema },
      { name: Magazine.name, schema: MagazineSchema },
      { name: Instrument.name, schema: InstrumentSchema },
    ]),
  ],
})
export class MagazineModule {}
