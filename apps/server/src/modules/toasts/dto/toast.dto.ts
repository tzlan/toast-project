import { IsString, IsDate, IsEnum } from 'class-validator';
import { ToastStatus } from '../enums/toast-status.enum';
import { Expose } from 'class-transformer';

export class ToastDto {
  @Expose()
  id!: string;

  @IsString()
  description!: string;

  @IsDate()
  date!: Date;

  
  @IsEnum(ToastStatus)
  statusToast!: ToastStatus;

  @IsString()
  place!: string;

  @Expose()
  @IsString()
  userId!: string;
}
