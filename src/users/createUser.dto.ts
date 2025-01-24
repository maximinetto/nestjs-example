import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { each: true },
  )
  roles: number[];
}
