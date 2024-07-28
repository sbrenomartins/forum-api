import { User } from '@prisma/client';
import { Answer } from 'src/answers/entities/answer.entity';

export class Question {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: User;
  answers: Answer[];
}
