import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateWorkshopDto, editWorkshopDto } from './dto/workshop.dto';
import { WorkshopService } from './workshop.service';

@Controller('workshop')
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}

  @Post()
  create(@Body() dto: CreateWorkshopDto) {
    return this.workshopService.create(dto);
  }

  @Get()
  async findAll() {
    return this.workshopService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.workshopService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: editWorkshopDto) {
    return this.workshopService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.workshopService.delete(id);
  }
}
