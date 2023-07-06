import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Country } from './Country';

@Entity({ name: "States" })
export class State {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  CountryId: number;

  @Column({ length: 100 })
  Name: string;

}
