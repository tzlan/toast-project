import { IsString, IsDate } from 'class-validator';

export class CreateToastDto {
  @IsString()
  description!: string;

  @IsDate()
  date!: Date;

  @IsString()
  place?: string;

  @IsString()
  userId!: string;
}
