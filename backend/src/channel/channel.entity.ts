import { Column, Entity } from 'typeorm';

@Entity('channel')
export class EChannel {
  @Column({ type: 'bigint', primary: true, unique: true })
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  link: string;
}
