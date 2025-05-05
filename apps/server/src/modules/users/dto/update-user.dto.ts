import { IsString, IsNumber, IsEnum, IsBoolean } from 'class-validator';
import { UsersStatus } from '../../../libs/enums';

export class UpdateUserDto {
  @IsNumber()
  soldierId?: number;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  password?: string;

  @IsEnum(UsersStatus)
  status?: UsersStatus;

  @IsBoolean()
  isAdmin?: boolean;

  @IsBoolean()
  isStatusForced?: boolean;
}
