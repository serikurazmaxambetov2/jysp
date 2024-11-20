import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ESession } from './session.entity';
import { Repository } from 'typeorm';
import { DSessionCreate } from './dto/create.dto';

@Injectable()
export class SessionService {
  private logger = new Logger(SessionService.name);

  constructor(
    @InjectRepository(ESession) private sessionRepo: Repository<ESession>,
  ) {}

  async create(dto: DSessionCreate) {
    this.logger.log(`Создание сессий с dto:\n${dto}`);
    return await this.sessionRepo.save(dto);
  }

  async findById(id: number) {
    this.logger.log(`Получение сессий по id: ${id}`);
    return await this.sessionRepo.findOne({
      where: { id },
      relations: {
        listenRelations: true,
        owner: true,
      },
    });
  }

  async checkExists(dto: DSessionCreate) {
    this.logger.log(`Проверка что сессия существует с dto:\n${dto}`);
    return await this.sessionRepo.exists({ where: { id: dto.id } });
  }

  async getFreeSession() {
    this.logger.log(
      `Получение свободной сессий (MAX_SESSION_RELATIONS=${process.env.MAX_SESSION_RELATIONS})`,
    );
    return await this.sessionRepo
      .createQueryBuilder('session')
      .leftJoin('session.listenRelations', 'relation')
      .groupBy('session.id')
      .having('COUNT(relation.id) < :count', {
        count: process.env.MAX_SESSION_RELATIONS,
      })
      .select('session')
      .getOne();
  }

  async setOwner(sessionId: number, ownerId: number) {
    this.logger.log(
      `Установка владельца сессий sessionId(${sessionId}), ownerId(${ownerId})`,
    );
    const session = await this.findById(sessionId);
    if (!session) {
      this.logger.log('Сессия не найдена');
      return false;
    }

    // @ts-expect-error Ignore type
    session.owner = { id: ownerId };
    this.logger.log('Установили владельца');

    return await this.sessionRepo.save(session);
  }
}
