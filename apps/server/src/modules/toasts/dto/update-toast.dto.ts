import { IsString, IsEnum, IsDate } from 'class-validator';

import { ToastStatus } from '../enums/toast-status.enum';
export class UpdateToastDto {
  @IsString()
  id!: string;

  @IsString()
  description!: string;

  @IsDate()
  date!: Date;

  @IsEnum(ToastStatus)
  statusToast!: ToastStatus;

  @IsString()
  place!: string;

  @IsString()
  userId!: string;
}
