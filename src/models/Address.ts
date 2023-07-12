import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Generic } from "./Generic";

@Entity({ name: "Addresses" })
export class Address extends Generic {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 255 })
  AddressLine1: string;

  @Column({ length: 255, nullable: true })
  AddressLine2: string;

  @Column({ nullable: true })
  CountryId: number;

  @Column({ nullable: true })
  StateId: number;

  @Column({ nullable: true })
  CityId: number;

  @Column({ length: 12, nullable: true })
  PostalCode: string;

  @Column({ nullable: true })
  LocationLink: string;
}
