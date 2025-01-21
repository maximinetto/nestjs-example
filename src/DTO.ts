import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export default class DTO {
  @Type(() => Number)
  @IsNumber()
  limit: number = 10;

  @IsString()
  @IsEnum(['asc', 'desc'])
  order: 'asc' | 'desc' = 'asc';
}
