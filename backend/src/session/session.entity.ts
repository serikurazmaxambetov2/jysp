import { ETelegramUser } from '../telegram-user/telegram-user.entity';
import { EChannelRelation } from '../channel-relation/channel-relation.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

@Entity('session')
export class ESession {
  @Column({ type: 'bigint', primary: true, unique: true })
  id: number;

  @Column({ type: 'text', name: 'full_name' })
  fullName: string;

  @Column({ type: 'text', unique: true, name: 'session_string' })
  sessionString: string;

  @Column({ type: 'text', unique: true })
  username: string;

  @OneToMany(() => EChannelRelation, (relation) => relation.session, {
    eager: true,
  })
  listenRelations: Relation<EChannelRelation[]>;

  @ManyToOne(() => ETelegramUser, (telegramUser) => telegramUser.sessions, {
    nullable: true,
  })
  @JoinColumn({ name: 'owner_id' })
  owner?: Relation<ETelegramUser>;
}
