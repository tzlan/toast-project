import {
  IsString,  IsNumber,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { UsersStatus } from '../../../libs/enums';

export class UpdateUserDto {
  @IsNumber()
  @IsOptional()
  soldierId?: number;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum(UsersStatus)
  @IsOptional()
  status?: UsersStatus;

  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;

  @IsBoolean()
  @IsOptional()
  isStatusForced?: boolean;
}