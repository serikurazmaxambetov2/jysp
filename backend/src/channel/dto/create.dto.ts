import { ApiProperty } from '@nestjs/swagger';
import {
  IsNegative,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class DChannelCreate {
  @ApiProperty({ type: 'number', maximum: -1 })
  @IsNegative({ message: 'validation.IS_NEGATIVE' })
  @IsNumber({}, { message: 'validation.IS_NUMBER' })
  id: number;

  @ApiProperty({ type: 'string', minLength: 1 })
  @IsNotEmpty({ message: 'validation.IS_NOT_EMPTY' })
  @IsString({ message: 'validation.IS_STRING' })
  title: string;

  @ApiProperty({ type: 'string' })
  @IsUrl({ host_whitelist: ['t.me'] }, { message: 'validation.IS_URL' })
  @IsString({ message: 'validation.IS_STRING' })
  link: string;

  // Для чтобы задать owner есть отдельный endpoint
}
