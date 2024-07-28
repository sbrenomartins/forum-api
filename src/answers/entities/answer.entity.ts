import { User } from '@prisma/client';
import { Question } from 'src/questions/entities/question.entity';

export class Answer {
  id: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  questionId: number;
  user: User;
  question: Question;
}
