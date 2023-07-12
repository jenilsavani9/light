import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Generic } from './Generic';

@Entity({ name: "Features" })
export class Feature extends Generic {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  UserId: number;

  @Column({ length: 50 })
  Name: string;

  @Column({ length: 255, nullable: true })
  Description: string;

  @Column()
  IsActive: boolean;
}
