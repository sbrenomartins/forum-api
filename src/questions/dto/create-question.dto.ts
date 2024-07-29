import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @Length(6)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  body: string;
}
