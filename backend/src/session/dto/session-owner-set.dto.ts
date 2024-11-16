import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DSessionOwnerSet {
  @ApiProperty({ type: 'number' })
  @IsNumber({}, { message: 'validation.IS_NUMBER' })
  id: number;
}
