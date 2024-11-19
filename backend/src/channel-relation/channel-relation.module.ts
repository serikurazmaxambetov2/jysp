import { Module } from '@nestjs/common';
import { ChannelRelationService } from './channel-relation.service';
import { ChannelRelationController } from './channel-relation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EChannelRelation } from './channel-relation.entity';
import { SessionModule } from 'src/session/session.module';

@Module({
  imports: [TypeOrmModule.forFeature([EChannelRelation]), SessionModule],
  controllers: [ChannelRelationController],
  providers: [ChannelRelationService],
})
export class ChannelRelationModule {}
