import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DChannelRelationFindById {
  @ApiProperty({
    type: 'string',
    example: 'bdf12ca3-05e4-4421-a98a-4e7af7309a72',
  })
  @IsUUID('all', { message: 'validation.IS_UUID' })
  id: string;
}
