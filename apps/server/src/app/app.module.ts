import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users';
import { ToastsModule } from '../toasts';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'golden_toast',
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    ToastsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
