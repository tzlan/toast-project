import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  async findAllUsers(): Promise<UserDto[]> {
    return this.usersService.findAllUsers();
  }
}
