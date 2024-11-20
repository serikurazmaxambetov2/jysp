import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EChannel } from './channel.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { DChannelCreate } from './dto/create.dto';

@Injectable()
export class ChannelService {
  private logger = new Logger(ChannelService.name);

  constructor(
    @InjectRepository(EChannel) private channelRepo: Repository<EChannel>,
  ) {}

  async create(dto: DChannelCreate) {
    this.logger.log(`Создаем канал c dto:\n${dto}`);
    return await this.channelRepo.save(dto);
  }

  async exists(options: FindManyOptions<EChannel>) {
    this.logger.log(`Проверяем нет ли канала с опциями:\n${options}`);
    return await this.channelRepo.exists(options);
  }

  async findById(id: number) {
    this.logger.log(`Получаем канал по его id: ${id}`);
    return await this.channelRepo.findOne({
      where: { id },
      relations: {
        owner: true,
        toChannelRelations: true,
        fromChannelRelations: true,
      },
    });
  }

  async setOwner(channelId: number, ownerId: number) {
    this.logger.log(
      `Устанавливаем владельца канала (${channelId}): ${ownerId}`,
    );
    const channel = await this.findById(channelId);
    if (!channel) {
      this.logger.log('Не удалось найти канал');
      return false;
    }

    // @ts-expect-error Ignore type
    channel.owner = { id: ownerId };
    this.logger.log(`Установили владельца канала:\n${channel}`);

    return await this.channelRepo.save(channel);
  }
}
