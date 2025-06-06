// apps/server/src/modules/users/users.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import type { Response, Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Post()
  async create(@Body() userData: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }

  @Put(':id')
  async adminEditUser(
    @Param('id') id: string,
    @Body() userData: Partial<User>
  ): Promise<User> {
    return this.usersService.adminEditUser(id, userData);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ message: string; user: Partial<User> }> {
    try {
      const result = await this.usersService.login(
        loginUserDto.soldierId,
        loginUserDto.password
      );

      if (result.success && result.user) {
        const userCleanedForResponse = result.user;
        res.status(HttpStatus.OK);
        return {
          message: 'Login successful',
          user: userCleanedForResponse,
        };
      } else {
        throw new UnauthorizedException('La connexion a échoué.');
      }
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Échec de la connexion');
    }
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ message: string }> {
    res.clearCookie('golden_toast_auth_token');
    res.status(HttpStatus.OK);
    return { message: 'Déconnexion réussie' };
  }
}
