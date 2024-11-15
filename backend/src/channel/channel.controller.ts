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

@ApiTags('channel')
@Controller('channel')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Post()
  async create(@Body() dto: DChannelCreate) {
    // Проверка на существование
    const channelExists = await this.channelService.exists({
      where: { id: dto.id },
    });
    if (channelExists) throw new BadRequestException('ALREADY_EXISTS');

    return await this.channelService.create(dto);
  }

  @Get(':id')
  async findById(@Param() params: DChannelFindById) {
    // Проверка на не существование
    const channel = await this.channelService.findById(params.id);
    if (!channel) throw new NotFoundException('NOT_FOUND');

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
    if (!channel) throw new NotFoundException('NOT_FOUND');

    return await this.channelService.findById(channel.id);
  }
}
