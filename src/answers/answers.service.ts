import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AnswersService {
  @Inject()
  private readonly prismaService: PrismaService;

  async create(
    createAnswerDto: CreateAnswerDto,
    userId: number,
    questionId: number,
  ) {
    return await this.prismaService.answers.create({
      data: {
        ...createAnswerDto,
        question: {
          connect: { id: questionId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll() {
    return await this.prismaService.answers.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.answers.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return await this.prismaService.answers.update({
      data: updateAnswerDto,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.answers.delete({
      where: {
        id,
      },
    });
  }
}
