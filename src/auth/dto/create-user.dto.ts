import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'The email must be a string' })
  @IsEmail()
  email: string;

  @IsString({ message: 'The password must be a string' })
  @MinLength(6, { message: 'The password must be at least 6 characters long' })
  @MaxLength(50, { message: 'The password must be at most 50 characters long' })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsString({ message: 'The name must be a string' })
  @MinLength(2, { message: 'The name must be at least 2 characters long' })
  name: string;
}
