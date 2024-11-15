import { EChannelRelation } from '../channel-relation/channel-relation.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';

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
}
