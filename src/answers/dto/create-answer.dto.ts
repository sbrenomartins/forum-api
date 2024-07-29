import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  @Length(6)
  body: string;
}
