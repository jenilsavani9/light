import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Country } from './Country';
import { State } from './State';

@Entity({ name: "Cities" })
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  countryId: number;

  @Column()
  stateId: number;

  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => Country)
  country: Country;

  @ManyToOne(() => State)
  state: State;
}
