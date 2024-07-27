/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';

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

  @Get(':id')
  async getUserById(
    @Param('id') id: string,
  ): Promise<Omit<UserModel, 'password'>> {
    const user = await this.userService.getUser({ id: Number(id) });

    const { password, ...result } = user;
    return result;
  }

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

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
  ): Promise<Omit<UserModel, 'password'>> {
    const user = await this.userService.deleteUser({ id: Number(id) });

    const { password, ...result } = user;
    return result;
  }
}
