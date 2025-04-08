import { IsString, IsDate, IsEnum } from 'class-validator';
import { UsersStatus } from '../../../libs/enums';

export class UserDto {
  @IsString()
  id!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  soldierId!: number;

  @IsString()
  isAdmin!: boolean;

  @IsString()
  isStatusForced!: boolean;

  @IsEnum(UsersStatus)
  status!: 'CRIMINAL' | 'LEGIT' | 'PERSONA_NON_GRATA';

  @IsDate()
  createdAt?: Date;

  @IsString()
  updatedAt?: Date;
}
