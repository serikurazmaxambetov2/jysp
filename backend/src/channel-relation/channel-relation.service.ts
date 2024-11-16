import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EChannelRelation } from './channel-relation.entity';
import { Repository } from 'typeorm';
import { DChannelRelationCreate } from './dto/create.dto';
import { DChannelRelationDelete } from './dto/delete.dto';

@Injectable()
export class ChannelRelationService {
  constructor(
    @InjectRepository(EChannelRelation)
    private channelRelationRepo: Repository<EChannelRelation>,
  ) {}

  async create(dto: DChannelRelationCreate) {
    return await this.channelRelationRepo.save(dto);
  }

  async checkExists(dto: DChannelRelationCreate) {
    const relation = await this.channelRelationRepo.findOne({ where: dto });

    // Проверка по цепочке
    const cyclicExists = await this.checkCyclicExists(dto);

    return relation || cyclicExists;
  }

  private async checkCyclicExists(dto: {
    fromChannel: { id: number };
    toChannel: { id: number };
  }) {
    const { fromChannel, toChannel } = dto;

    const visitedChannels = new Set<number>();

    const hasCycle = async (
      currentChannelId: number,
      targetChannelId: number,
    ) => {
      if (visitedChannels.has(currentChannelId)) {
        return false; // Избегаем повторного посещения узлов
      }

      visitedChannels.add(currentChannelId);

      const relations = await this.channelRelationRepo.find({
        where: { fromChannel: { id: currentChannelId } },
      });

      for (const relation of relations) {
        if (relation.toChannel.id === targetChannelId) {
          return true; // Обнаружен цикл
        }

        if (await hasCycle(relation.toChannel.id, targetChannelId)) {
          return true;
        }
      }

      return false; // Если ни один путь не ведет к целевому каналу
    };

    return await hasCycle(toChannel.id, fromChannel.id);
  }

  async delete(dto: DChannelRelationDelete) {
    return await this.channelRelationRepo.delete(dto);
  }
}
