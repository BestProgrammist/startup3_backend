import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { createReportDto } from './dto/report.dto';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  create(@Body() dto: createReportDto) {
    return this.reportService.create(dto);
  }

  @Get()
  async findAll() {
    return this.reportService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.reportService.findById(id);
  }
  @Put(':id')
  updateIns(@Param('id') id: string, @Body() dto: createReportDto) {
    return this.reportService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reportService.delete(id);
  }
}
