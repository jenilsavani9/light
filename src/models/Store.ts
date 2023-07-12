import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Generic } from './Generic';

@Entity({ name: "Stores" })
export class Store extends Generic {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  UserId: number;

  @Column({ length: 50 })
  Name: string;

  @Column({ nullable: true })
  AddressId: number;

  @Column()
  IsActive: boolean;
}
