import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Country } from './Country';

@Entity({ name: "States" })
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  countryId: number;

  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => Country)
  country: Country;
}
