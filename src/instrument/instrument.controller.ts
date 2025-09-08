import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateInstrumentDto } from './dto/instrument.dto';
import { InstrumentService } from './instrument.service';

@Controller('instrument')
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Post()
  create(@Body() dto: CreateInstrumentDto) {
    return this.instrumentService.create(dto);
  }

  @Get()
  async findAll() {
    return this.instrumentService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.instrumentService.findById(id);
  }
  @Put(':id')
  updateIns(@Param('id') id: string, @Body() dto: CreateInstrumentDto) {
    return this.instrumentService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.instrumentService.delete(id);
  }
}
