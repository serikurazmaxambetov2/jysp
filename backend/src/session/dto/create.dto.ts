import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class DSessionCreate {
  @ApiProperty({ type: 'number' })
  @IsNumber({}, { message: 'validation.IS_NUMBER' })
  id: number;

  @ApiProperty({ type: 'string', minLength: 1 })
  @IsNotEmpty({ message: 'validation.IS_NOT_EMPTY' })
  @IsString({ message: 'validation.IS_STRING' })
  fullName: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty({ message: 'validation.IS_NOT_EMPTY' })
  @IsString({ message: 'validation.IS_STRING' })
  sessionString: string;

  @ApiProperty({ type: 'string' })
  @MinLength(6, { message: 'validation.MIN_LENGTH' })
  @Transform(({ value }: { value: string }) => {
    if (value.startsWith('@')) return value;
    return '@' + value;
  })
  @IsString({ message: 'validation.IS_STRING' })
  username: string;

  // Для owner'а есть отдельный endpoint
}
