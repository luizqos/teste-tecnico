import { IsOptional, IsIn } from 'class-validator';

export class FilterUserDto {
  @IsOptional()
  @IsIn(['admin', 'user'])
  role?: string;

  @IsOptional()
  @IsIn(['name', 'createdAt'])
  sortBy?: 'name' | 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';
}
