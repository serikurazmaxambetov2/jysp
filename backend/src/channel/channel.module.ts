import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EChannel } from './channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EChannel])],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
