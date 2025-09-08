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
import { CreateMagazineDto } from './dto/magazine.dto';
import { MagazineService } from './magazine.service';

@Controller('magazine')
export class MagazineController {
  constructor(private readonly magazinService: MagazineService) {}

  @HttpCode(200)
  @Post()
  async createMagazine(@Body() dto: CreateMagazineDto) {
    return await this.magazinService.create(dto);
  }
  @HttpCode(200)
  @Get()
  async getMagazines() {
    return await this.magazinService.getAllmagazine();
  }
  @HttpCode(200)
  @Put(':id')
  async updateMagazine(
    @Param('id') id: string,
    @Body() dto: CreateMagazineDto,
  ) {
    return await this.magazinService.update(id, dto);
  }
  @HttpCode(200)
  @Delete(':id')
  async deleteMagazine(@Param('id') id: string) {
    return await this.magazinService.delete(id);
  }
}
