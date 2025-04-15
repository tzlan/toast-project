import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {}

  async findAllUsers(): Promise<UserDto[]> {
    return this.userModel.findAll({});
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userModel.findByPk(id);
  }
}
