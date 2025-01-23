import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export default class DTO {
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsNumber()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  @IsEnum(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'asc';
}
