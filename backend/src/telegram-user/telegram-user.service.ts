import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ETelegramUser } from './telegram-user.entity';
import { Repository } from 'typeorm';
import { DTelegramUserCreate } from './dto/create.dto';

@Injectable()
export class TelegramUserService {
  private logger = new Logger(TelegramUserService.name);

  constructor(
    @InjectRepository(ETelegramUser)
    private userRepo: Repository<ETelegramUser>,
  ) {}

  async create(dto: DTelegramUserCreate) {
    this.logger.log(`Создание пользователя с dto:\n${dto}`);
    return await this.userRepo.save(dto);
  }

  async findById(id: number) {
    this.logger.log(`Получение пользователя по id: ${id}`);
    return await this.userRepo.findOne({
      where: { id },
      relations: {
        sessions: true,
        channels: true,
      },
    });
  }

  async checkExists(dto: DTelegramUserCreate) {
    this.logger.log(`Проверка что пользователь уже существует по dto:\n${dto}`);
    return await this.userRepo.exists({
      where: { id: dto.id },
    });
  }

  async getRelations(id: number) {
    this.logger.log(`Получение связок пользователя по id: ${id}`);
    const user = await this.userRepo.findOne({
      where: { id },
      relations: {
        channels: {
          fromChannelRelations: true,
        },
      },
    });

    this.logger.log(`Проверка что пользователь существует user:\n${user}`);
    if (!user) return false;

    return user.channels;
  }
}
