import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateLokomotivDto } from './dto/lokomotiv.dto';
import { LokomotiveService } from './lokomotive.service';

@Controller('lokomotiv')
export class LokomotiveController {
  constructor(private readonly lokomotivService: LokomotiveService) {}

  @Post()
  create(@Body() dto: CreateLokomotivDto) {
    return this.lokomotivService.create(dto);
  }

  @Get()
  async findAll() {
    return this.lokomotivService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.lokomotivService.findById(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateLokomotivDto) {
    return this.lokomotivService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.lokomotivService.delete(id);
  }
}
