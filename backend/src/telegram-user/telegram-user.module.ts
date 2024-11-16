import { Module } from '@nestjs/common';
import { TelegramUserService } from './telegram-user.service';
import { TelegramUserController } from './telegram-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ETelegramUser } from './telegram-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ETelegramUser])],
  controllers: [TelegramUserController],
  providers: [TelegramUserService],
})
export class TelegramUserModule {}
