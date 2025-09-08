import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  createOrganizationDto,
  editOrganizationDto,
} from './dto/organization.dto';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}
  @HttpCode(200)
  @Get('/')
  async getHello() {
    return await this.organizationService.getOrgan();
  }
  @HttpCode(201)
  @Get('/:id')
  async getByid(@Param('id') id: string) {
    return await this.organizationService.getByid(id);
  }
  @Post('/')
  async postOrgan(@Body() dto: createOrganizationDto) {
    return await this.organizationService.createOrgan(dto);
  }
  @Put('/:id')
  async updateOrgan(@Param('id') id: string, @Body() dto: editOrganizationDto) {
    return await this.organizationService.updateOrgan(id, dto);
  }
  @Delete('/:id')
  async deleteOrgan(@Param('id') id: string) {
    return await this.organizationService.deleteOrgan(id);
  }
}
