import { IsOptional, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class FilterUserDto {
  @ApiPropertyOptional({
    description: 'Filtro por Perfil (admin, user)',
    example: 'admin',
  })
  @IsOptional()
  @IsIn(['admin', 'user'])
  role?: string;

  @ApiPropertyOptional({
    description: 'Ordenar por campo (id, name, email, role)',
    enum: ['id', 'name', 'role', 'createdAt'],
    example: 'name',
  })
  @IsOptional()
  @IsIn(['id', 'name', 'role', 'createdAt'])
  sortBy?: 'id' | 'name' | 'role' | 'createdAt';

  @ApiPropertyOptional({
    description: 'Tipo de Ordenação (asc ou desc)',
    enum: ['asc', 'desc'],
    example: 'asc',
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';
}
