import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: 'Email is not valid',
    },
  )
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3)
  name: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @Length(6)
  password: string;
}
