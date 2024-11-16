import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ETelegramUser } from './telegram-user.entity';
import { Repository } from 'typeorm';
import { DTelegramUserCreate } from './dto/create.dto';

@Injectable()
export class TelegramUserService {
  constructor(
    @InjectRepository(ETelegramUser)
    private userRepo: Repository<ETelegramUser>,
  ) {}

  async create(dto: DTelegramUserCreate) {
    return await this.userRepo.save(dto);
  }

  async findById(id: number) {
    return await this.userRepo.findOne({
      where: { id },
      relations: {
        sessions: true,
        channels: true,
      },
    });
  }

  async checkExists(dto: DTelegramUserCreate) {
    return await this.userRepo.exists({
      where: { id: dto.id },
    });
  }

  async getRelations(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: {
        channels: {
          fromChannelRelations: true,
        },
      },
    });

    return user.channels;
  }
}
