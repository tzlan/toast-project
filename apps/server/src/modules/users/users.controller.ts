import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

import { UserDto } from './dto/users.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all-users')
  async findAllUsers(): Promise<UserDto[]> {
    try {
      return this.usersService.findAllUsers();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }

  // @Get(':id')
  // async findOneUser(@Param('id') id: string): Promise<User | null> {
  //   return this.usersService.findOneUser(id);
  // }
}
