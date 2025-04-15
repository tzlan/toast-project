import { Controller, Get, Param } from '@nestjs/common';
import { ToastsService } from './toasts.service';
import { Toast } from './entities/toast.entity';
import { ToastDto } from './dto/toast.dto';

@Controller('toasts')
export class ToastsController {
  constructor(private readonly toastsService: ToastsService) {}

  @Get('all-toasts')
  async findAll(): Promise<ToastDto[]> {
    return this.toastsService.findAll();
  }

  // @Get(':id')
  // async findToastById(@Param('id') id: string): Promise<Toast | null> {
  //   return this.toastsService.findToastById(id);
  // }
}
