import { IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  soldierId!: number;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  password!: string;
}
