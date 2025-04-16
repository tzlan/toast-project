import { Body, Controller, Get , Post} from '@nestjs/common';
import { ToastsService } from './toasts.service';
import { ToastDto } from './dto/toast.dto';

@Controller('toasts')
export class ToastsController {
  constructor(private readonly toastsService: ToastsService) {}

  @Get('')
  async findAll(): Promise<ToastDto[]> {
    return this.toastsService.findAll();
  }

  @Post('create')
  async create(@Body() toastDto: ToastDto): Promise<ToastDto> {
    return this.toastsService.createToast(toastDto);
  }

}
