import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  createOrganizationDto,
  editOrganizationDto,
} from './dto/organization.dto';
import { OrganDocument, Organization } from './schema/organization.schema';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization.name) private organModel: Model<OrganDocument>,
  ) {}
  async getOrgan() {
    return await this.organModel.find();
  }
  async createOrgan(dto: createOrganizationDto) {
    return await this.organModel.create(dto);
  }
  async getByid(id: string) {
    return await this.organModel.findById(id);
  }
  async updateOrgan(id: string, dto: editOrganizationDto) {
    return await this.organModel.findByIdAndUpdate(id, dto, { new: true });
  }
  async deleteOrgan(id: string) {
    return await this.organModel.findByIdAndDelete(id);
  }
}
