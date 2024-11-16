import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ESession } from './session.entity';
import { Repository } from 'typeorm';
import { DSessionCreate } from './dto/create.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(ESession) private sessionRepo: Repository<ESession>,
  ) {}

  async create(dto: DSessionCreate) {
    return await this.sessionRepo.save(dto);
  }

  async findById(id: number) {
    return await this.sessionRepo.findOne({
      where: { id },
      relations: {
        listenRelations: true,
        owner: true,
      },
    });
  }

  async checkExists(dto: DSessionCreate) {
    return await this.sessionRepo.exists({ where: { id: dto.id } });
  }

  async getFreeSession() {
    return await this.sessionRepo
      .createQueryBuilder('session')
      .leftJoinAndSelect('session.listenRelations', 'relation')
      .where('relation.id IS NOT NULL')
      .groupBy('session.id')
      .having('COUNT(relation.id) <= :count', {
        count: process.env.MAX_SESSION_RELATIONS,
      })
      .getOne();
  }

  async setOwner(sessionId: number, ownerId: number) {
    const session = await this.findById(sessionId);
    if (!session) return false;

    // @ts-expect-error Ignore type
    session.owner = { id: ownerId };

    return await this.sessionRepo.save(session);
  }
}
