import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { plainToInstance } from 'class-transformer';
import { Toast } from './entities/toast.entity';
import { User } from '../users';
import { ToastDto } from './dto/toast.dto';


@Injectable()
export class ToastsService {
  constructor(
    @InjectModel(Toast)
    private toastModel: typeof Toast
  ) {}

  async findAll(): Promise<ToastDto[]> {
    const toasts = await this.toastModel.findAll({
      include: [{ model: User, as: 'user' }],
    });

    return toasts.map((toast) =>
      plainToInstance(ToastDto, toast.get({ plain: true }), {
        excludeExtraneousValues: true,
      })
    );
  }
}
