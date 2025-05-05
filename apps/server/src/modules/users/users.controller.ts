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
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  async findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Post('create')
  async create(@Body() userData: Partial<User>): Promise<User> {
    return this.usersService.createUser(userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }

  @Put(':id')
  async adminEditUser(
    @Param('id') id: string,
    @Body() userData: Partial<User>
  ): Promise<User> {
    return this.usersService.adminEditUser(id, userData);
  }
}
