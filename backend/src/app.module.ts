import { Module } from '@nestjs/common';
import { ChannelModule } from './channel/channel.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data.source';
import { ChannelRelationModule } from './channel-relation/channel-relation.module';
import { SessionModule } from './session/session.module';
import { TelegramUserModule } from './telegram-user/telegram-user.module';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ChannelModule,
    ChannelRelationModule,
    SessionModule,
    TelegramUserModule,
    I18nModule.forRoot({
      fallbackLanguage: 'ru',
      loaderOptions: {
        path: join(__dirname, 'i18n'),
        watch: true,
      },
      typesOutputPath: join(
        __dirname,
        '..',
        'src',
        'generated',
        'i18n.generated.ts',
      ),
      resolvers: [AcceptLanguageResolver],
    }),
  ],
})
export class AppModule {}
