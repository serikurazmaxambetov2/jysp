import { Module } from '@nestjs/common';
import { ChannelModule } from './channel/channel.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data.source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ChannelModule],
})
export class AppModule {}
