import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { plainToInstance } from 'class-transformer';
import { Toast } from './entities/toast.entity';
import { User } from '../users/entities/user.entity';
import { ToastDto } from './dto/toast.dto';

@Injectable()
export class ToastsService {
  constructor(
    @InjectModel(Toast)
    private toastModel: typeof Toast
  ) {}

  async findAll() {
    return await this.toastModel.findAll({
      include: [{ model: User, as: 'user' }],
    });
  }

  // async findToastById(id: string): Promise<ToastDto | null> {
  //   const toast = await this.toastModel.findByPk(id, {
  //     include: [{ model: User, as: 'user' }],
  //   });
  //   if (!toast) {
  //     return null;
  //   }
  //   return plainToClass(ToastDto, toast, { excludeExtraneousValues: true });
  // }
}
