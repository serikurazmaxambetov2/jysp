import { ESession } from '../session/session.entity';
import { EChannel } from '../channel/channel.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity('channel_relation')
export class EChannelRelation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true, name: 'display_name' })
  displayName?: string;

  @ManyToOne(() => EChannel, { eager: true })
  @JoinColumn({ name: 'from_channel_id' })
  fromChannel: Relation<EChannel>;

  @ManyToOne(() => EChannel, { eager: true })
  @JoinColumn({ name: 'to_channel_id' })
  toChannel: Relation<EChannel>;

  @ManyToOne(() => ESession, (session) => session.listenRelations)
  @JoinColumn({ name: 'session_id' })
  session: Relation<ESession>;

  // Настройки
  @Column({ type: 'boolean', default: false, name: 'use_ai' })
  useAi: boolean;

  @Column({ type: 'boolean', default: true, name: 'use_media' })
  useMedia: boolean;

  @Column({ type: 'boolean', default: true, name: 'use_media_group' })
  useMediaGroup: boolean;

  @Column({ type: 'boolean', default: true, name: 'use_formatting' })
  useFormatting: boolean;
}
