import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Magazine,
  MagazineDocument,
} from 'src/magazine/schema/magazine.schema';
import { CreateWorkshopDto, editWorkshopDto } from './dto/workshop.dto';
import { Workshop, WorkshopDocument } from './schema/workshop.schema';

@Injectable()
export class WorkshopService {
  constructor(
    @InjectModel(Workshop.name) private workshopModel: Model<WorkshopDocument>,
    @InjectModel(Magazine.name) private magazineModel: Model<MagazineDocument>,
  ) {}

  async create(createWorkshopDto: CreateWorkshopDto): Promise<Workshop> {
    return this.workshopModel.create(createWorkshopDto);
  }

  async findAll(): Promise<Workshop[]> {
    const workshops = await this.workshopModel
      .find()
      .populate('organization')
      .lean();
    // Har bir workshop uchun jurnal sonini hisoblaymiz
    const withCounts = await Promise.all(
      workshops.map(async (workshop) => {
        const journalsCount = await this.magazineModel.countDocuments({
          workshop: workshop._id, // 🔑 Muhim,
        });
        return { ...workshop, journalsCount };
      }),
    );
    return withCounts;
  }

  async findById(id: string): Promise<Workshop> {
    const workshop = await this.workshopModel
      .findById(id)
      .populate('organization');
    if (!workshop) throw new NotFoundException('Workshop not found');
    return workshop;
  }
  async update(id: string, dto: editWorkshopDto) {
    return await this.workshopModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string): Promise<void> {
    const result = await this.workshopModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Workshop not found');
  }
}
