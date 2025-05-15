import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ToastsService } from './toasts.service';

import { Toast } from './entities/toast.entity';

@Controller('toasts')
export class ToastsController {
  constructor(private readonly toastsService: ToastsService) {}

  @Get('')
  async findAll(): Promise<Toast[]> {
    return this.toastsService.findAll();
  }

  @Post('create')
  async create(@Body() toastData: Partial<Toast>): Promise<Toast> {
    return this.toastsService.createToast(toastData);
  }

  @Delete(':id')
  async deleteToast(@Param('id') id: string): Promise<void> {
    await this.toastsService.deleteToast(id);
  }

  @Put(':id')
  async adminEditToast(
    @Param('id') id: string,
    @Body() toastData: Partial<Toast>
  ): Promise<Toast> {
    return this.toastsService.adminEditToast(id, toastData);
  }

  @Get('personal-record/:userId')
  async getPersonalRecord(@Param('userId') userId: string): Promise<number> {
    try {
      return await this.toastsService.getPersonalRecord(userId);
    } catch (error) {
      throw new NotFoundException(
        error.message || 'Error fetching personal record'
      );
    }
  }

  @Get('all-time-record')
  async getAllTimeRecord(): Promise<{ count: number }> {
    const count = await this.toastsService.getAllTimeRecord();
    return { count };
  }

  @Get('current-record')
  async getCurrentRecord(): Promise<{ count: number }> {
    const count = await this.toastsService.getCurrentRecord();
    return { count };
  }
  
}



/**
 *   async getAllTimeRecord(): Promise<number> {
    const { fn, col, literal } = this.toastModel.sequelize;
    
    const { max_count } = await this.toastModel.findOne({
        attributes: [
            [fn('COUNT', col('id')), 'max_count']
        ],
        group: [
            fn('YEAR', col('date')),
            literal(`CASE WHEN MONTH("date") >= 7 THEN 'H2' ELSE 'H1' END`)
        ],
        order: [[col('max_count'), 'DESC']],
        raw: true
    });

    return max_count || 0;
}
 */

 /*async getAllTimeRecord(): Promise<number> {
    const results = (await this.toastModel.findAll({
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
        [fn('COUNT', col('id')), 'total'],
      ],
      group: ['year', 'period'],
      order: [[fn('COUNT', col('id')), 'DESC']],
      limit: 1,
      raw: true,
    })) as unknown as Array<{ year: number | string; period: string; total: number | string; }>;

    return results.length > 0 ? Number(results[0].total) : 0;
  }


  interface RawPeriodRecord {
  year: number;
  period: string;
  count: string; // Sequelize COUNT retourne souvent une string
}



**/
