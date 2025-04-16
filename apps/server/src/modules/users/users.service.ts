import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from './dto/users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {}

  async findAllUsers(): Promise<UserDto[]> {
    return this.userModel.findAll({});
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.userModel.create(createUserDto);
    return plainToClass<UserDto, User>(UserDto, user, {});
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userModel.findByPk(id);
  }
}
