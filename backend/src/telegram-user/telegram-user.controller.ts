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

@Controller('telegram-user')
export class TelegramUserController {
  constructor(private telegramUserService: TelegramUserService) {}

  @Post()
  async create(@Body() dto: DTelegramUserCreate) {
    const userExists = await this.telegramUserService.checkExists(dto);
    if (userExists) throw new BadRequestException('ALREADY_EXISTS');

    return await this.telegramUserService.create(dto);
  }

  @Get(':id')
  async findById(@Param() params: DTelegramUserFindById) {
    return await this.telegramUserService.findById(params.id);
  }

  @Get(':id/relations')
  async getRelations(@Param() params: DTelegramUserFindById) {
    const relations = await this.telegramUserService.getRelations(params.id);
    if (!relations) throw new NotFoundException('NOT_FOUND');

    return relations;
  }
}
