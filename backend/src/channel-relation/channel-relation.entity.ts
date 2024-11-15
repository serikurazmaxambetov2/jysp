import { ESession } from '../session/session.entity';
import { EChannel } from '../channel/channel.entity';
import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';

@Entity('channel_relation')
export class EChannelRelation {
  @Column({ type: 'bigint', primary: true, unique: true })
  id: number;

  @Column({ type: 'text', nullable: true, name: 'display_name' })
  displayName?: string;

  @ManyToOne(() => EChannel)
  @JoinColumn({ name: 'from_channel_id' })
  fromChannel: Relation<EChannel>;

  @ManyToOne(() => EChannel)
  @JoinColumn({ name: 'to_channel_id' })
  toChannel: Relation<EChannel>;

  @ManyToOne(() => ESession, (session) => session.listenRelations)
  @JoinColumn({ name: 'session_id' })
  session: Relation<ESession>;
}
