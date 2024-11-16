import { Module } from '@nestjs/common';
import { ChannelRelationService } from './channel-relation.service';
import { ChannelRelationController } from './channel-relation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EChannelRelation } from './channel-relation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EChannelRelation])],
  controllers: [ChannelRelationController],
  providers: [ChannelRelationService],
})
export class ChannelRelationModule {}
