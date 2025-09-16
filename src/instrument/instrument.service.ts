import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateInstrumentDto } from './dto/instrument.dto';
import { Instrument, InstrumentDocument } from './schema/instrument.schema';

@Injectable()
export class InstrumentService {
  constructor(
    @InjectModel(Instrument.name)
    private instrumentModel: Model<InstrumentDocument>,
  ) {}

  async create(createInstrumentDto: CreateInstrumentDto): Promise<Instrument> {
    const existinst = await this.instrumentModel.findOne({
      serialNumber: createInstrumentDto.serialNumber,
    });
    if (existinst) throw new ConflictException('Bu nomerli jihoz yaratilgan!');
    return await this.instrumentModel.create({
      ...createInstrumentDto,
      locationId: new Types.ObjectId(createInstrumentDto.locationId),
      workshop: new Types.ObjectId(createInstrumentDto.workshop),
      magazine: new Types.ObjectId(createInstrumentDto.magazine),
    });
  }

  async update(
    id: string,
    createInstrumentDto: CreateInstrumentDto,
  ): Promise<Instrument | null> {
    return await this.instrumentModel.findByIdAndUpdate(id, {
      ...createInstrumentDto,
      locationId: new Types.ObjectId(createInstrumentDto.locationId),
      workshop: new Types.ObjectId(createInstrumentDto.workshop),
      magazine: new Types.ObjectId(createInstrumentDto.magazine),
    });
  }

  async findAll(): Promise<Instrument[]> {
    return await this.instrumentModel.find().exec();
  }

  async findById(id: string): Promise<Instrument> {
    const instrument = await this.instrumentModel.findById(id);
    if (!instrument) throw new NotFoundException('Jihoz not found');
    return instrument;
  }

  async delete(id: string): Promise<void> {
    const result = await this.instrumentModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Jihoz not found');
  }
}
