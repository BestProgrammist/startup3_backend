import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InstrumentController } from './instrument.controller';
import { InstrumentService } from './instrument.service';
import { Instrument, InstrumentSchema } from './schema/instrument.schema';

@Module({
  controllers: [InstrumentController],
  providers: [InstrumentService],
  imports: [
    MongooseModule.forFeature([
      { name: Instrument.name, schema: InstrumentSchema },
    ]),
  ],
})
export class InstrumentModule {}
