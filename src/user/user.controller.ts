/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signUpUser(
    @Body(new ValidationPipe()) userData: CreateUserDto,
  ): Promise<Omit<UserModel, 'password'>> {
    const user = await this.userService.createUser(userData);

    const { password, ...result } = user;
    return result;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Omit<UserModel, 'password'>> {
    const user = await this.userService.getUser({ id });

    const { password, ...result } = user;
    return result;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) userData: UpdateUserDto,
  ): Promise<Omit<UserModel, 'password'>> {
    const user = await this.userService.updateUser({
      data: userData,
      where: {
        id,
      },
    });

    const { password, ...result } = user;
    return result;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Omit<UserModel, 'password'>> {
    const user = await this.userService.deleteUser({ id });

    const { password, ...result } = user;
    return result;
  }
}
