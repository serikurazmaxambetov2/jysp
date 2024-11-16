import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { DChannelFindById } from 'src/channel/dto/find-by-id.dto';

export class DChannelRelationCreate {
  @ApiProperty({ type: DChannelFindById })
  @ValidateNested()
  @Type(() => DChannelFindById)
  fromChannel: DChannelFindById;

  @ApiProperty({ type: DChannelFindById })
  @ValidateNested()
  @Type(() => DChannelFindById)
  toChannel: DChannelFindById;
}
