import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNegative, IsNumber } from 'class-validator';

export class DChannelFindById {
  @ApiProperty({ type: 'number', maximum: -1 })
  @IsNegative({ message: 'validation.IS_NEGATIVE' })
  @IsNumber({}, { message: 'validation.IS_NUMBER' })
  @Transform(({ value }: { value: string }) => +value)
  id: number;
}
