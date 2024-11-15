import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EChannel } from './channel.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { DChannelCreate } from './dto/create.dto';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(EChannel) private channelRepo: Repository<EChannel>,
  ) {}

  async create(dto: DChannelCreate) {
    return await this.channelRepo.save(dto);
  }

  async exists(options: FindManyOptions<EChannel>) {
    return await this.channelRepo.exists(options);
  }

  async findById(id: number) {
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
    return await this.channelRepo.update(
      { id: channelId },
      { owner: { id: ownerId } },
    );
  }
}
