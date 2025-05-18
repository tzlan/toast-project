import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';
import { Toast } from './entities/toast.entity';
import { User } from '../users';
import { ToastDto } from './dto/toast.dto';
import { fn, literal, where, Op, col } from 'sequelize';

interface PeriodRecord {
  year?: number;
  period?: string;
  count?: number;
}

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
    updateToastDto: Partial<ToastDto>
  ): Promise<Toast> {
    const toast = await this.toastModel.findOne({ where: { id } });

    if (!toast) {
      throw new NotFoundException(`Toast with this ID ${id} not found`);
    }
    await toast.update(updateToastDto);
    return toast;
  }

  async getPersonalRecord(userId: string): Promise<number> {
    const inputDate = new Date();
    const year = inputDate.getFullYear();

    let startPhase, endPhase;

    const month = inputDate.getMonth() + 1;

    if (month >= 7 && month <= 12) {
      startPhase = new Date(`${year}-07-01T00:00:00Z`);
      endPhase = new Date(`${year}-12-31T23:59:59Z`);
    } else {
      startPhase = new Date(`${year}-01-01T00:00:00Z`);
      endPhase = new Date(`${year}-06-30T23:59:59Z`);
    }

    const count = await this.toastModel.count({
      where: {
        userId,
        date: {
          [Op.between]: [startPhase, endPhase],
        },
      },
    });

    if (count === 0) {
      throw new NotFoundException(
        `No toasts for user ${userId} in the phase from ${
          startPhase.toISOString().split('T')[0]
        } to ${endPhase.toISOString().split('T')[0]}`
      );
    }

    return count;
  }

  async getCurrentRecord(): Promise<number> {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const dateMax7Mounth = currentMonth >= 7;

    const toastCountInPeriod = await this.toastModel.count({
      where: {
        [Op.and]: [
          where(fn('EXTRACT', literal('YEAR FROM "date"')), currentYear),
          dateMax7Mounth
            ? where(fn('EXTRACT', literal('MONTH FROM "date"')), {
                [Op.gte]: 7,
              })
            : where(fn('EXTRACT', literal('MONTH FROM "date"')), {
                [Op.lt]: 7,
              }),
        ],
      },
    });

    return toastCountInPeriod;
  }

  async getAllTimeRecord(): Promise<number> {
    const results: PeriodRecord[] = await this.toastModel.findAll({
      attributes: [
        [fn('EXTRACT', literal('YEAR FROM "date"')), 'year'],
        [
          literal(`
            CASE 
              WHEN EXTRACT(MONTH FROM "date") >= 7 THEN 'H2'
              ELSE 'H1'
            END
          `),
          'period',
        ],
        [fn('COUNT', col('id')), 'count'],
      ],
      group: ['year', 'period'],
      order: [[literal('count'), 'DESC']],
      limit: 1,
      raw: true,
    });

    return results.length > 0 ? Number(results[0].count) : 0;
  }
}
