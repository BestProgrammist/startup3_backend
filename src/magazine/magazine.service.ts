import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Instrument,
  InstrumentDocument,
} from 'src/instrument/schema/instrument.schema';
import { CreateMagazineDto } from './dto/magazine.dto';
import { Magazine, MagazineDocument } from './schema/magazine.schema';

@Injectable()
export class MagazineService {
  constructor(
    @InjectModel(Magazine.name) private magazineModel: Model<MagazineDocument>,
    @InjectModel(Instrument.name)
    private instrumentModel: Model<InstrumentDocument>,
  ) {}

  async getAllmagazine(): Promise<Magazine[]> {
    const magazines = await this.magazineModel
      .find()
      .populate('workshop')
      .lean();
    const withCounts = await Promise.all(
      magazines.map(async (magazine) => {
        const instrumentsCount = await this.instrumentModel.countDocuments({
          magazine: magazine._id, // 🔑 Muhim,
        });
        return { ...magazine, instrumentsCount };
      }),
    );
    return withCounts;
  }

  async create(createMagazineDto: CreateMagazineDto): Promise<Magazine> {
    return await this.magazineModel.create(createMagazineDto);
    // return await this.magazineModel.create({
    //   ...createMagazineDto,
    //   workshop: new Types.ObjectId(createMagazineDto.workshop),
    // });
  }
  async update(
    _id: string,
    createMagazineDto: CreateMagazineDto,
  ): Promise<Magazine | null> {
    return await this.magazineModel.findByIdAndUpdate(_id, createMagazineDto);
    //   ...createMagazineDto,
    //   workshop: new Types.ObjectId(createMagazineDto.workshop),
    // });
  }
  async delete(id: string): Promise<void> {
    const result = await this.magazineModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Jurnal not found');
  }
}
