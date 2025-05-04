import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { plainToInstance } from 'class-transformer';
import { Toast } from './entities/toast.entity';
import { User } from '../users';
import { ToastDto } from './dto/toast.dto';
import { plainToClass } from 'class-transformer';

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
      plainToInstance(ToastDto, toast.get({ plain: true }), {})
    );
  }



  async createToast(toastDto: ToastDto): Promise<ToastDto> {
    const toast = await this.toastModel.create(toastDto);
    return plainToClass<ToastDto, Toast>(ToastDto, toast, {});
  }


  async deleteToast(id: string): Promise<void> {
    const toast = await this.toastModel.findOne({ where: { id } });
    if (toast) {await toast.destroy()};
  }

}
