import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Toast } from './entities/toast.entity';
import { User } from '../users';

@Injectable()
export class ToastsService {
  constructor(
    @InjectModel(Toast)
    private toastModel: typeof Toast
  ) {}

  async findAll(): Promise<Toast[]> {
    const toasts = await this.toastModel.findAll({
      include: [{ model: User, as: 'user' }],
    });
    return toasts;
  }

  async createToast(toastData: Partial<Toast>): Promise<Toast> {
    const toast = await this.toastModel.create(toastData);
    return toast;
  }

  async deleteToast(id: string): Promise<void> {
    const toast = await this.toastModel.findOne({ where: { id } });
    if (toast) {
      await toast.destroy();
    } else {
      throw new NotFoundException('Toast not found');
    }
  }

  async adminEditToast(
    id: string,
    UpdateToastDto: Partial<Toast>
  ): Promise<Toast> {
    throw new Error('Method not implemented.');
  }
}
