import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { DChannelFindById } from 'src/channel/dto/find-by-id.dto';

export class DChannelRelationCreate {
  @ApiProperty({ type: DChannelFindById })
  @ValidateNested()
  fromChannel: DChannelFindById;

  @ApiProperty({ type: DChannelFindById })
  @ValidateNested()
  toChannel: DChannelFindById;
}
