import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Generic } from './Generic';

@Entity()
export class Feature extends Generic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 255, nullable: true })
  description: string;

  @Column()
  isActive: boolean;

  @ManyToOne(() => User)
  user: User;
}
