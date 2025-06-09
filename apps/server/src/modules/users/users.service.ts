import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.userModel.findAll({});
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    console.log('Attempting to create user with data:', userData);
    const user = await this.userModel.create(userData);
    console.log('User created:', user.id);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    console.log(`Attempting to delete user with ID: ${id}`);
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) {
      console.warn(`Delete failed: User with ID ${id} not found.`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await user.destroy();
    console.log(`User with ID ${id} deleted successfully.`);
  }

  async adminEditUser(id: string, updateUserDto: Partial<User>): Promise<User> {
    console.log(
      `Attempting to edit user with ID: ${id} with data:`,
      updateUserDto
    );
    const user = await this.userModel.findOne({ where: { id } });

    if (!user) {
      console.warn(`Edit failed: User with ID ${id} not found.`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await user.update(updateUserDto);
    console.log(`User with ID ${id} updated successfully.`);
    return user;
  }

  async login(
    soldierId: number,
    passwordAttempt: string
  ): Promise<{ success: boolean; user: Partial<User> }> {
    console.log(`Login attempt for soldierId: ${soldierId}`);

    const user = await this.userModel.findOne({
      where: {
        soldierId: soldierId,
        deletedAt: null,
      },
    });

    if (!user) {
      console.warn(
        `Login failed: User with soldierId ${soldierId} not found or deleted.`
      );
      throw new UnauthorizedException('Invalid ID or password.');
    }

    console.log(`User found: ${user.soldierId}`);

    if (user.password !== passwordAttempt) {
      console.warn(
        `Login failed: Password mismatch for soldierId ${soldierId}. Provided: "${passwordAttempt}", Stored: "${user.password}"`
      );
      throw new UnauthorizedException('Invalid ID or password.');
    }

    console.log(`Password matched for soldierId: ${soldierId}.`);

    const userPlainObject = user.get({ plain: true });

    const {
      password,
      deletedAt,
      createdAt,
      updatedAt,
      isStatusForced,
      ...userWithoutSensitiveData
    } = userPlainObject;

    console.log(
      `Login successful for soldierId: ${soldierId}. Returning user data:`,
      userWithoutSensitiveData
    );

    return {
      success: true,
      user: userWithoutSensitiveData,
    };
  }
}
