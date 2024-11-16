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

@ApiTags('channel-relation')
@Controller('channel-relation')
export class ChannelRelationController {
  constructor(private channelRelationService: ChannelRelationService) {}

  @Post()
  async create(@Body() dto: DChannelRelationCreate) {
    const channelExists = await this.channelRelationService.checkExists(dto);
    if (channelExists) throw new BadRequestException('ALREADY_EXISTS');

    return await this.channelRelationService.create(dto);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Body() dto: DChannelRelationDelete) {
    const result = await this.channelRelationService.delete(dto);

    // Проверка что удаление произошло успешно
    if (result.affected == 0) throw new NotFoundException('NOT_FOUND');
  }
}
