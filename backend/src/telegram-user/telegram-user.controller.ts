import { Controller } from '@nestjs/common';
import { TelegramUserService } from './telegram-user.service';

@Controller('telegram-user')
export class TelegramUserController {
  constructor(private telegramUserService: TelegramUserService) {}
}
