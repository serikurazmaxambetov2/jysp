import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EChannelRelation } from './channel-relation.entity';
import { Repository } from 'typeorm';
import { DChannelRelationCreate } from './dto/create.dto';
import { DChannelRelationDelete } from './dto/delete.dto';
import { SessionService } from 'src/session/session.service';
import { DChannelRelationFind } from './dto/find.dto';
import { DChannelRelationOptionsUpdate } from './dto/update-options.dto';

@Injectable()
export class ChannelRelationService {
  private logger = new Logger(ChannelRelationService.name);

  constructor(
    @InjectRepository(EChannelRelation)
    private channelRelationRepo: Repository<EChannelRelation>,
    private sessionService: SessionService,
  ) {}

  async create(dto: DChannelRelationCreate) {
    this.logger.log(`Создание канала с dto:\n${dto}`);

    const freeSession = await this.sessionService.getFreeSession();
    if (!freeSession) return null;

    return await this.channelRelationRepo.save(
      { ...dto, session: freeSession },
      { reload: true },
    );
  }

  async checkExists(dto: DChannelRelationCreate) {
    this.logger.log(`Проверка на существование с dto:\n${dto}`);

    const relation = await this.channelRelationRepo.findOne({ where: dto });

    // Если уже существует возвращаем true
    if (relation) {
      this.logger.log(`Существует`);
      return true;
    }

    // Проверка по цепочке
    const cyclicExists = await this.checkCyclicExists(dto);
    return cyclicExists;
  }

  private async checkCyclicExists(dto: DChannelRelationCreate) {
    this.logger.log(`Проверка на циклическое существование с dto:\n${dto}`);

    const { fromChannel, toChannel } = dto;
    const visitedChannels = new Set<number>();

    if (fromChannel.id === toChannel.id) {
      this.logger.log('Канал получателя равен каналу отправителя ошибка!');
      return true;
    }

    const hasCycle = async (fromChannelId: number, toChannelId: number) => {
      if (visitedChannels.has(fromChannelId)) {
        return false; // Избегаем повторного посещения узлов
      }

      visitedChannels.add(fromChannelId);

      this.logger.log(
        `Получаем все связки по fromChannelId(${fromChannelId}), toChannelId(${toChannelId})`,
      );
      const relations = await this.channelRelationRepo.find({
        where: { toChannel: { id: fromChannelId } },
      });

      for (const relation of relations) {
        this.logger.log(
          `Проверка ${relation.fromChannel.id} === ${toChannelId}`,
        );
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
    this.logger.log(`Удаление связки по dto:\n${dto}`);
    return await this.channelRelationRepo.delete(dto);
  }

  async find(dto: DChannelRelationFind) {
    this.logger.log(`Получение связок по dto:\n${dto}`);
    return await this.channelRelationRepo.find({
      where: dto,
      relations: {
        fromChannel: true,
        toChannel: true,
      },
    });
  }

  async update(id: string, dto: DChannelRelationOptionsUpdate) {
    return await this.channelRelationRepo.update({ id }, dto);
  }
}
