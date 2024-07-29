import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class QuestionsService {
  @Inject()
  private readonly prismaService: PrismaService;

  async create(createQuestionDto: CreateQuestionDto, userId: number) {
    return await this.prismaService.questions.create({
      data: {
        ...createQuestionDto,
        userId,
      },
    });
  }

  async findAll() {
    return await this.prismaService.questions.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.questions.findFirst({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        answers: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.prismaService.questions.update({
      data: updateQuestionDto,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.questions.delete({
      where: {
        id,
      },
    });
  }
}
