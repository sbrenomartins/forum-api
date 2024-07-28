/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signUpUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<Omit<UserModel, 'password'>> {
    const user = await this.userService.createUser(userData);

    const { password, ...result } = user;
    return result;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(
    @Param('id') id: string,
  ): Promise<Omit<UserModel, 'password'>> {
    const user = await this.userService.getUser({ id: Number(id) });

    const { password, ...result } = user;
    return result;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: Prisma.UserUpdateInput,
  ): Promise<Omit<UserModel, 'password'>> {
    const user = await this.userService.updateUser({
      data: userData,
      where: {
        id: Number(id),
      },
    });

    const { password, ...result } = user;
    return result;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
  ): Promise<Omit<UserModel, 'password'>> {
    const user = await this.userService.deleteUser({ id: Number(id) });

    const { password, ...result } = user;
    return result;
  }
}
