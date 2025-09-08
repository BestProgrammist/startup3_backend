import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Instrument,
  InstrumentSchema,
} from 'src/instrument/schema/instrument.schema';
import { LokomotiveController } from './lokomotive.controller';
import { LokomotiveService } from './lokomotive.service';
import { Lokomotiv, LokomotivSchema } from './schema/lokomotiv.schema';

@Module({
  controllers: [LokomotiveController],
  providers: [LokomotiveService],
  imports: [
    MongooseModule.forFeature([
      { name: Lokomotiv.name, schema: LokomotivSchema },
      { name: Instrument.name, schema: InstrumentSchema },
    ]),
  ],
  exports: [LokomotiveService],
})
export class LokomotiveModule {}
