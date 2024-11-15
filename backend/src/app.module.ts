import { Module } from '@nestjs/common';
import { ChannelModule } from './channel/channel.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data.source';
import { ChannelRelationModule } from './channel-relation/channel-relation.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ChannelModule,
    ChannelRelationModule,
    SessionModule,
  ],
})
export class AppModule {}
