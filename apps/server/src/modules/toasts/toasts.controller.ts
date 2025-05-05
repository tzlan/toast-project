import {
  Body,
  Controller,
  Delete,
  Get,
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
}
