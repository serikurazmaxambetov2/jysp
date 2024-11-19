import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { TelegramUserService } from './telegram-user.service';
import { DTelegramUserCreate } from './dto/create.dto';
import { DTelegramUserFindById } from './dto/find-by-id.dto';
import { ApiTags } from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '../generated/i18n.generated';

@ApiTags('telegram-user')
@Controller('telegram-user')
export class TelegramUserController {
  constructor(
    private telegramUserService: TelegramUserService,
    private i18n: I18nService<I18nTranslations>,
  ) {}

  @Post()
  async create(@Body() dto: DTelegramUserCreate) {
    const userExists = await this.telegramUserService.checkExists(dto);
    if (userExists)
      throw new BadRequestException(this.i18n.t('validation.ALREADY_EXISTS'));

    return await this.telegramUserService.create(dto);
  }

  @Get(':id')
  async findById(@Param() params: DTelegramUserFindById) {
    return await this.telegramUserService.findById(params.id);
  }

  @Get(':id/relations')
  async getRelations(@Param() params: DTelegramUserFindById) {
    const relations = await this.telegramUserService.getRelations(params.id);
    if (!relations)
      throw new NotFoundException(this.i18n.t('validation.NOT_FOUND'));

    return relations;
  }
}
