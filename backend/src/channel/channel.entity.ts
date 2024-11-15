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

@Entity('channel')
export class EChannel {
  @Column({ type: 'bigint', primary: true, unique: true })
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  link: string;

  @OneToMany(
    () => EChannelRelation,
    (channelRelation) => channelRelation.toChannel,
  )
  fromChannelRelations: Relation<EChannelRelation[]>;

  @OneToMany(
    () => EChannelRelation,
    (channelRelation) => channelRelation.fromChannel,
  )
  toChannelRelations: Relation<EChannelRelation[]>;

  @ManyToOne(() => ETelegramUser, (telegramUser) => telegramUser.channels, {
    nullable: true,
  })
  @JoinColumn({ name: 'owner_id' })
  owner?: Relation<ETelegramUser>;
}
