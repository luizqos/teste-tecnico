import { IsEmail, IsNotEmpty, MinLength, IsIn } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsIn(['admin', 'user'])
  role: 'admin' | 'user';
}
