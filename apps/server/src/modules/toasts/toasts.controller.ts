import { Controller, Get} from '@nestjs/common';
import { ToastsService } from './toasts.service';
import { ToastDto } from './dto/toast.dto';

@Controller('toasts')
export class ToastsController {
  constructor(private readonly toastsService: ToastsService) {}

  @Get('')
  async findAll(): Promise<ToastDto[]> {
    return this.toastsService.findAll();
  }

  // @Get(':id')
  // async findToastById(@Param('id') id: string): Promise<Toast | null> {
  //   return this.toastsService.findToastById(id);
  // }
}
