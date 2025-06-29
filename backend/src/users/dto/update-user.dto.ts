import { IsEmail, IsOptional, MinLength, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'João Silva' })
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senhaSegura123' })
  @IsOptional()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'user', enum: ['admin', 'user'] })
  @IsOptional()
  @IsIn(['admin', 'user'])
  role: 'admin' | 'user';

  @ApiProperty({ example: 'status', enum: [false, true] })
  @IsOptional()
  @IsIn([false, true])
  status?: boolean;
}
