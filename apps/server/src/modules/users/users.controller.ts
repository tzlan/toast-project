import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/users.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  async findAllUsers(): Promise<UserDto[]> {
    return this.usersService.findAllUsers();
  }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.createUser(createUserDto);
  }

  @Delete(':id/delete')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteUser(id);
  }

  @Put(':id/update')
  async adminEditUser(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto
  ): Promise<UserDto> {
    return this.usersService.adminEditUser(id, updateUserDto);
  }
}
