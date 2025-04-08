import { Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async listUsers(): Promise<User[]> {
    return this.usersService.listUsers();
  }
  @Get()
  async findOneUser(@Param('id') id: string): Promise<User | undefined> {
    return this.usersService.findOneUser(id);
  }

  @Post()
  async signIn(): Promise<User> {
    return this.usersService.signIn();
  }
}
