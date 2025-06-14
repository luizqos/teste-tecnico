import { IsEmail, IsNotEmpty, MinLength, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'João Silva' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senhaSegura123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'user', enum: ['admin', 'user'] })
  @IsNotEmpty()
  @IsIn(['admin', 'user'])
  role: 'admin' | 'user';
}
