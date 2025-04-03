import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Toast } from './entities/toast.entity';
import { ToastsService } from './toasts.service';
import { ToastsController } from './toasts.controller';

@Module({
  imports: [SequelizeModule.forFeature([Toast])],
  providers: [ToastsService],
  controllers: [ToastsController],
})
export class ToastsModule {}
