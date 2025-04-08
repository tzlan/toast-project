import { IsString, IsDate, IsEnum } from 'class-validator';

enum ToastStatus {
  ON_TIME = 'ON TIME',
  DELAYED = 'DELAYED',
  CANCELED = 'CANCELED',
}

export class ToastDto {
  @IsString()
  id!: string;

  @IsString()
  description!: string;

  @IsDate()
  date!: Date;

  @IsEnum(ToastStatus)
  statusToast!: 'ON TIME' | 'DELAYED' | 'CANCELED';

  @IsString()
  place!: string;


}
