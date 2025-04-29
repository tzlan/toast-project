import { IsString, IsNumber,} from 'class-validator';


export class CreateUserDto {
  @IsString()
  id!: string;

  @IsNumber()
  soldierId!: number;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  password!: string;
}
