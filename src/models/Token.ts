import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Generic } from './Generic';

@Entity({ name: "Tokens" })
export class Token extends Generic {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  UserId: number;

  @Column()
  Value: string;

  @Column()
  IsActive: boolean;
}
