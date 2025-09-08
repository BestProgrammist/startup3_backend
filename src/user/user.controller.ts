import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { userDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('my-profile')
  @Auth('USER')
  async getmyprofile() {
    return 'my profile';
  }
  @Get()
  // @Auth('ADMIN')
  async getAllusers() {
    return this.userService.getAllUsers();
  }
  @Put('edituser/:id')
  async EditUser(@Param('id') id: string, @Body() userDto: userDto) {
    console.log(userDto);
    return this.userService.editUser(id, userDto);
  }
  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
