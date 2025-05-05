import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.userModel.findAll({});
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = await this.userModel.create(userData);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userModel.findOne({ where: { id } });
    user
      ? user.destroy().then(() => {})
      : (() => {
          throw new NotFoundException(`User with ID ${id} not found`);
        })();
  }

  async adminEditUser(id: string, updateUserDto: Partial<User>): Promise<User> {
    const user = await this.userModel.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with this ID ${id} not found`);
    }
    await user.update(updateUserDto);
    return user;
  }
}
