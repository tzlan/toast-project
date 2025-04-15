import { IsString, IsDate, IsEnum } from 'class-validator';
import { ToastStatus } from '../enums/toast-status.enum';

export class ToastDto {
  @IsString()
  id!: string;

  @IsString()
  description!: string;

  @IsDate()
  date!: Date;

  @IsEnum(ToastStatus)
  statusToast!: ToastStatus;

  @IsString()
  place?: string;

  @IsString()
  userId!: string;
}
