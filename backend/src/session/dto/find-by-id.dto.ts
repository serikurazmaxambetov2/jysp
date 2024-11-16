import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DSessionFindById {
  @ApiProperty({ type: 'number' })
  @IsNumber({}, { message: 'IS_NUMBER' })
  @Transform(({ value }: { value: string }) => +value)
  id: number;
}
