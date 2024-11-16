import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DChannelOwnerSet {
  @ApiProperty({ type: 'number' })
  @IsNumber({}, { message: 'validation.IS_NUMBER' })
  id: number; // ID владельца канала
}
