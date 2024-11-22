import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class DChannelRelationOptionsUpdate {
  @ApiProperty({ type: 'boolean' })
  @IsBoolean({ message: 'validation.IS_BOOLEAN' })
  useAi: boolean;
}
