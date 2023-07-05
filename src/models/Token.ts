import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Generic } from './Generic';

@Entity()
export class Token extends Generic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  value: string;

  @Column()
  isActive: boolean;

  @ManyToOne(() => User)
  user: User;
}
