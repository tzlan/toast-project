import { Controller, Get, Param } from '@nestjs/common';
import { ToastsService } from './toasts.service';
import { Toast } from './entities/toast.entity';

@Controller('toasts')
export class ToastsController {
  constructor(private readonly toastsService: ToastsService) {}

  @Get('all')
  async findAll(): Promise<Toast[]> {
    return this.toastsService.findAll();
  }

  @Get(':id')
  async findOneToast(@Param('id') id: string): Promise<Toast | null> {
    return this.toastsService.findOneToast(id);
  }
}
