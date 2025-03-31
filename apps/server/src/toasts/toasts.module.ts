import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
import { Toast } from './entities/toast.entity';

@Module({
  imports: [SequelizeModule.forFeature([Toast])],
  // providers: [UsersService],
  // controllers: [UsersController],
})
export class ToastsModule {}

