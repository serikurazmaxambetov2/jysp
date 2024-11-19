import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { DSessionCreate } from './dto/create.dto';
import { DSessionFindById } from './dto/find-by-id.dto';
import { DSessionOwnerSet } from './dto/session-owner-set.dto';
import { ApiTags } from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '../generated/i18n.generated';

@ApiTags('session')
@Controller('session')
export class SessionController {
  constructor(
    private sessionService: SessionService,
    private i18n: I18nService<I18nTranslations>,
  ) {}

  @Post()
  async create(@Body() dto: DSessionCreate) {
    const sessionExists = await this.sessionService.checkExists(dto);
    if (sessionExists)
      throw new BadRequestException(this.i18n.t('validation.ALREADY_EXISTS'));

    return await this.sessionService.create(dto);
  }

  @Get(':id')
  async findById(@Param() params: DSessionFindById) {
    const session = await this.sessionService.findById(params.id);
    if (!session)
      throw new NotFoundException(this.i18n.t('validation.NOT_FOUND'));

    return session;
  }

  @Post('/:id/owner')
  async setOwner(
    @Param() params: DSessionFindById,
    @Body() dto: DSessionOwnerSet,
  ) {
    const session = await this.sessionService.setOwner(
      params.id, // ID сессий
      dto.id, // ID owner'а
    );
    if (!session)
      throw new NotFoundException(this.i18n.t('validation.NOT_FOUND'));

    return session;
  }
}
