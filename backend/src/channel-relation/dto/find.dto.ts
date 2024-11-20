import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { DChannelFindById } from 'src/channel/dto/find-by-id.dto';
import { DSessionFindById } from 'src/session/dto/find-by-id.dto';

export class DChannelRelationFind {
  @ApiProperty({ type: 'string' })
  @IsUUID('all', { message: 'IS_UUID' })
  id?: string;

  @ApiProperty({ type: DChannelFindById })
  @ValidateNested()
  @Type(() => DChannelFindById)
  @IsOptional()
  fromChannel?: DChannelFindById;

  @ApiProperty({ type: DChannelFindById })
  @ValidateNested()
  @Type(() => DChannelFindById)
  @IsOptional()
  toChannel?: DChannelFindById;

  @ApiProperty({ type: DSessionFindById })
  @ValidateNested()
  @Type(() => DSessionFindById)
  @IsOptional()
  session?: DSessionFindById;
}
