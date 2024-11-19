import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ChannelService } from './channel.service';
import { DChannelCreate } from './dto/create.dto';
import { DChannelFindById } from './dto/find-by-id.dto';
import { DChannelOwnerSet } from './dto/channel-owner-set.dto';
import { ApiTags } from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '../generated/i18n.generated';

@ApiTags('channel')
@Controller('channel')
export class ChannelController {
  constructor(
    private channelService: ChannelService,
    private i18n: I18nService<I18nTranslations>,
  ) {}

  @Post()
  async create(@Body() dto: DChannelCreate) {
    // Проверка на существование
    const channelExists = await this.channelService.exists({
      where: { id: dto.id },
    });
    if (channelExists)
      throw new BadRequestException(this.i18n.t('validation.ALREADY_EXISTS'));

    return await this.channelService.create(dto);
  }

  @Get(':id')
  async findById(@Param() params: DChannelFindById) {
    // Проверка на не существование
    const channel = await this.channelService.findById(params.id);
    if (!channel)
      throw new NotFoundException(this.i18n.t('validation.NOT_FOUND'));

    return channel;
  }

  @Post(':id/owner')
  async setOwner(
    @Param() params: DChannelFindById,
    @Body() dto: DChannelOwnerSet,
  ) {
    // Проверка на не существование
    const channel = await this.channelService.setOwner(
      params.id, // ID канала
      dto.id, // ID владельца
    );
    if (!channel)
      throw new NotFoundException(this.i18n.t('validation.NOT_FOUND'));

    return await this.channelService.findById(channel.id);
  }
}
