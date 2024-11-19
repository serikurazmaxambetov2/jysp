import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EChannelRelation } from './channel-relation.entity';
import { Repository } from 'typeorm';
import { DChannelRelationCreate } from './dto/create.dto';
import { DChannelRelationDelete } from './dto/delete.dto';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class ChannelRelationService {
  constructor(
    @InjectRepository(EChannelRelation)
    private channelRelationRepo: Repository<EChannelRelation>,
    private sessionService: SessionService,
  ) {}

  async create(dto: DChannelRelationCreate) {
    const freeSession = await this.sessionService.getFreeSession();
    if (!freeSession) return null;

    return await this.channelRelationRepo.save(
      { ...dto, session: freeSession },
      { reload: true },
    );
  }

  async checkExists(dto: DChannelRelationCreate) {
    const relation = await this.channelRelationRepo.findOne({ where: dto });

    // Если уже существует возвращаем true
    if (relation) {
      return true;
    }

    // Проверка по цепочке
    const cyclicExists = await this.checkCyclicExists(dto);
    return cyclicExists;
  }

  private async checkCyclicExists(dto: DChannelRelationCreate) {
    const { fromChannel, toChannel } = dto;
    const visitedChannels = new Set<number>();

    if (fromChannel.id === toChannel.id) {
      return true;
    }

    const hasCycle = async (fromChannelId: number, toChannelId: number) => {
      if (visitedChannels.has(fromChannelId)) {
        return false; // Избегаем повторного посещения узлов
      }

      visitedChannels.add(fromChannelId);

      const relations = await this.channelRelationRepo.find({
        where: { toChannel: { id: fromChannelId } },
      });

      for (const relation of relations) {
        if (relation.fromChannel.id === toChannelId) {
          return true;
        }

        if (await hasCycle(relation.fromChannel.id, toChannelId)) {
          return true;
        }
      }

      return false;
    };

    return await hasCycle(fromChannel.id, toChannel.id);
  }

  async delete(dto: DChannelRelationDelete) {
    return await this.channelRelationRepo.delete(dto);
  }
}
