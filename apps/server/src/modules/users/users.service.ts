import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from './dto/users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToClass } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async deleteUser(id: string): Promise<void> {
    const user = await this.userModel.findOne({ where: { id } });
    user
      ? user.destroy().then(() => {
          console.log('User deleted successfully');
        })
      : (() => {
          throw new NotFoundException(`User with ID ${id} not found`);
        })();
  }

  async adminEditUser( id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {

    const user = await this.userModel.findOne({ where: { id } });

    if (!user) throw new NotFoundException(`User with this id : -- >  ${id} not find`);
    
    await user.update(updateUserDto);
    return plainToClass<UserDto, User>(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }
}

