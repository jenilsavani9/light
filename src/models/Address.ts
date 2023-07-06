import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { City } from './City';
import { Country } from './Country';
import { State } from './State';
import { Generic } from './Generic';

@Entity({ name: "Addresses" })
export class Address extends Generic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  addressLine1: string;

  @Column({ length: 255, nullable: true })
  addressLine2: string;

  @Column({ nullable: true })
  countryId: number;

  @Column({ nullable: true })
  stateId: number;

  @Column({ nullable: true })
  cityId: number;

  @Column({ length: 12, nullable: true })
  postalCode: string;

  @Column({ nullable: true })
  locationLink: string;

  @ManyToOne(() => City)
  city: City;

  @ManyToOne(() => Country)
  country: Country;

  @ManyToOne(() => State)
  state: State;
}
