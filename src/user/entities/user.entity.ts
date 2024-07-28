import { Answer } from 'src/answers/entities/answer.entity';
import { Question } from 'src/questions/entities/question.entity';

export class User {
  id: number;
  email: string;
  name?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  questions: Question[];
  answers: Answer[];
}
