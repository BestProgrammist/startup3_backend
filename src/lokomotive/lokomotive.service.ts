import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instrument } from 'src/instrument/schema/instrument.schema';
import { InstrumentDocument } from './../instrument/schema/instrument.schema';
import { CreateLokomotivDto } from './dto/lokomotiv.dto';
import { Lokomotiv, LokomotivDocument } from './schema/lokomotiv.schema';

@Injectable()
export class LokomotiveService {
  constructor(
    @InjectModel(Lokomotiv.name)
    private lokomotivModel: Model<LokomotivDocument>,
    @InjectModel(Instrument.name)
    private instrumentModel: Model<InstrumentDocument>,
  ) {}

  async create(createWorkshopDto: CreateLokomotivDto): Promise<Lokomotiv> {
    return await this.lokomotivModel.create(createWorkshopDto);
  }
  async update(id: string, createWorkshopDto: CreateLokomotivDto) {
    return await this.lokomotivModel.findByIdAndUpdate(id, createWorkshopDto);
  }

  async findAll(): Promise<Lokomotiv[]> {
    const lokomotives = await this.lokomotivModel
      .find()
      .populate('organization')
      .lean();
    // Har bir lokomotiv uchun jihozlar sonini hisoblaymiz
    const withCounts = await Promise.all(
      lokomotives.map(async (lokomotiv) => {
        const instrumentsCount = await this.instrumentModel.countDocuments({
          locationId: lokomotiv._id, // 🔑 Muhim,
        });
        return { ...lokomotiv, instrumentsCount };
      }),
    );
    return withCounts;
  }

  async findById(id: string): Promise<Lokomotiv> {
    const workshop = await this.lokomotivModel
      .findById(id)
      .populate('organization');
    if (!workshop) throw new NotFoundException('Workshop not found');
    return workshop;
  }

  async delete(id: string): Promise<void> {
    const result = await this.lokomotivModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Workshop not found');
  }
}
