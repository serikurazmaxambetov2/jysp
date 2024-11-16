import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class DTelegramUserCreate {
  @ApiProperty({ type: 'number' })
  @IsNumber({}, { message: 'validation.IS_NUMBER' })
  id: number;

  @ApiProperty({ type: 'string', minLength: 1 })
  @IsString({ message: 'validation.IS_STRING' })
  fullName: string;

  @ApiProperty({ type: 'string', nullable: true })
  @MinLength(6, { message: 'validation.MIN_LENGTH' })
  @Transform(({ value }: { value: string }) => {
    if (value.startsWith('@')) return value;
    return '@' + value;
  })
  @IsString({ message: 'validation.IS_STRING' })
  @IsOptional()
  username?: string;
}
