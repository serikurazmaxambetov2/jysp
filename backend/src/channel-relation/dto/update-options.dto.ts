import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class DChannelRelationOptionsUpdate {
  @ApiProperty({ type: 'boolean' })
  @IsBoolean({ message: 'validation.IS_BOOLEAN' })
  @IsOptional()
  useAi?: boolean;

  @ApiProperty({ type: 'boolean' })
  @IsBoolean({ message: 'validation.IS_BOOLEAN' })
  @IsOptional()
  useMedia?: boolean;

  @ApiProperty({ type: 'boolean' })
  @IsBoolean({ message: 'validation.IS_BOOLEAN' })
  @IsOptional()
  useMediaGroup?: boolean;

  @ApiProperty({ type: 'string' })
  @IsString({ message: 'validation.IS_STRING' })
  @Length(2, 20, { message: 'validation.MAX_LENGTH' })
  @IsOptional()
  displayName?: string;
}
