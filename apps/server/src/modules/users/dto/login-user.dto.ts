import { IsString, IsNumber } from 'class-validator';

export class LoginUserDto {
  @IsNumber()
  soldierId!: number;

  @IsString()
  password!: string;
}
