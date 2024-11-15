import { Module } from '@nestjs/common';
import { ChannelRelationService } from './channel-relation.service';
import { ChannelRelationController } from './channel-relation.controller';

@Module({
  controllers: [ChannelRelationController],
  providers: [ChannelRelationService],
})
export class ChannelRelationModule {}
