import { Module } from '@nestjs/common';
import { ChannelModule } from './channel/channel.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data.source';
import { ChannelRelationModule } from './channel-relation/channel-relation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ChannelModule,
    ChannelRelationModule,
  ],
})
export class AppModule {}
