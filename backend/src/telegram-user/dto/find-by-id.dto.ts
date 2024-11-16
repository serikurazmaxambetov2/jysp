import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DTelegramUserFindById {
  @ApiProperty({ type: 'number' })
  @IsNumber({}, { message: 'validation.IS_NUMBER' })
  @Transform(({ value }: { value: string }) => +value)
  id: number;
}
