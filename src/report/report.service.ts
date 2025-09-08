import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { createReportDto } from './dto/report.dto';
import { Report, ReportDocument } from './schema/report.schema';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name)
    private reportModel: Model<ReportDocument>,
  ) {}

  async create(createReportDto: createReportDto): Promise<Report> {
    return await this.reportModel.create({
      ...createReportDto,
      magazinelocation: new Types.ObjectId(createReportDto.magazinelocation),
    });
  }

  async update(
    id: string,
    createReportDto: createReportDto,
  ): Promise<Report | null> {
    return await this.reportModel.findByIdAndUpdate(id, {
      ...createReportDto,
      magazinelocation: new Types.ObjectId(createReportDto.magazinelocation),
    });
  }

  async findAll(): Promise<Report[]> {
    return await this.reportModel.find().exec();
  }

  async findById(id: string): Promise<Report> {
    const instrument = await this.reportModel.findById(id);
    if (!instrument) throw new NotFoundException('Jihoz not found');
    return instrument;
  }

  async delete(id: string): Promise<void> {
    const result = await this.reportModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Jihoz not found');
  }
}
