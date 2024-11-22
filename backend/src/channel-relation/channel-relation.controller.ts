import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ChannelRelationService } from './channel-relation.service';
import { DChannelRelationCreate } from './dto/create.dto';
import { DChannelRelationDelete } from './dto/delete.dto';
import { ApiTags } from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '../generated/i18n.generated';
import { DChannelRelationFind } from './dto/find.dto';
import { DChannelRelationOptionsUpdate } from './dto/update-options.dto';
import { DChannelRelationFindById } from './dto/find-by-id.dto';

@ApiTags('channel-relation')
@Controller('channel-relation')
export class ChannelRelationController {
  constructor(
    private channelRelationService: ChannelRelationService,
    private i18n: I18nService<I18nTranslations>,
  ) {}

  @Post()
  async create(@Body() dto: DChannelRelationCreate) {
    // Проверяем нет ли уже в бд таких связок
    const relationExists = await this.channelRelationService.checkExists(dto);
    if (relationExists)
      throw new BadRequestException(this.i18n.t('validation.ALREADY_EXISTS'));

    // Создаем связку
    const createdRelation = await this.channelRelationService.create(dto);
    if (!createdRelation)
      throw new BadRequestException(
        this.i18n.t('validation.SESSION_NOT_ENOUGH'),
      );

    return createdRelation;
  }

  @Post('find')
  async find(@Body() dto: DChannelRelationFind) {
    return await this.channelRelationService.find(dto);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Body() dto: DChannelRelationDelete) {
    const result = await this.channelRelationService.delete(dto);

    // Проверка что удаление произошло успешно
    if (result.affected == 0)
      throw new NotFoundException(this.i18n.t('validation.NOT_FOUND'));
  }

  @Post(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Body() dto: DChannelRelationOptionsUpdate,
    @Param() params: DChannelRelationFindById,
  ) {
    const result = await this.channelRelationService.update(params.id, dto);

    if (result.affected == 0)
      throw new NotFoundException(this.i18n.t('validation.NOT_FOUND'));
  }
}
