import { NumberTransformer } from 'src/database/transformers/number.transformer';
import { EChannel } from '../channel/channel.entity';
import { ESession } from '../session/session.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';

@Entity('telegram_user')
export class ETelegramUser {
  @Column({
    type: 'bigint',
    primary: true,
    unique: true,
    transformer: [NumberTransformer],
  })
  id: number;

  @Column({ type: 'text', name: 'full_name' })
  fullName: string;

  @Column({ type: 'text', nullable: true })
  username?: string;

  @OneToMany(() => EChannel, (channel) => channel.owner, { eager: true })
  channels: Relation<EChannel[]>;

  @OneToMany(() => ESession, (session) => session.owner, { eager: true })
  sessions: Relation<ESession[]>;
}
