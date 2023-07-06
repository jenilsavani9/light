import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Country } from './Country';
import { State } from './State';

@Entity({ name: "Cities" })
export class City {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  CountryId: number;

  @Column()
  StateId: number;

  @Column({ length: 100 })
  Name: string;
}
