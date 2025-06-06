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
    const user = await this.userModel.create(userData);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    await user.destroy();
  }

  async adminEditUser(id: string, updateUserDto: Partial<User>): Promise<User> {
    const user = await this.userModel.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    await user.update(updateUserDto);
    return user;
  }

  async login(
    soldierId: number,
    passwordAttempt: string
  ): Promise<{ success: boolean; user: Partial<User> }> {
    const user = await this.userModel.findOne({ where: { soldierId, deletedAt: null } });

    if (!user) {
      throw new UnauthorizedException('Identifiant ou mot de passe incorrect.');
    }

    if (user.password !== passwordAttempt) {
      throw new UnauthorizedException('Identifiant ou mot de passe incorrect.');
    }

    const userPlainObject = user.get({ plain: true });

    const {
      password,
      deletedAt,
      createdAt,
      updatedAt,
      isStatusForced,
      ...userWithoutSensitiveData
    } = userPlainObject;

    return {
      success: true,
      user: userWithoutSensitiveData,
    };
  }
}