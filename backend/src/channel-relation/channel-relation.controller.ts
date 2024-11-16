import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ChannelRelationService } from './channel-relation.service';
import { DChannelRelationCreate } from './dto/create.dto';
import { DChannelRelationDelete } from './dto/delete.dto';
import { ApiTags } from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

@ApiTags('channel-relation')
@Controller('channel-relation')
export class ChannelRelationController {
  constructor(
    private channelRelationService: ChannelRelationService,
    private i18n: I18nService<I18nTranslations>,
  ) {}

  @Post()
  async create(@Body() dto: DChannelRelationCreate) {
    const channelExists = await this.channelRelationService.checkExists(dto);
    if (channelExists)
      throw new BadRequestException(this.i18n.t('validation.ALREADY_EXISTS'));

    return await this.channelRelationService.create(dto);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Body() dto: DChannelRelationDelete) {
    const result = await this.channelRelationService.delete(dto);

    // Проверка что удаление произошло успешно
    if (result.affected == 0)
      throw new NotFoundException(this.i18n.t('validation.NOT_FOUND'));
  }
}
