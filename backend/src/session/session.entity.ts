import { EChannelRelation } from '../channel-relation/channel-relation.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';

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

  @OneToMany(() => EChannelRelation, (relation) => relation.session)
  listenRelations: Relation<EChannelRelation[]>;
}
