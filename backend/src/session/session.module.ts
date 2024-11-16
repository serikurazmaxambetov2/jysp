import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ESession } from './session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ESession])],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
