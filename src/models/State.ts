import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: "States" })
export class State {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  CountryId: number;

  @Column({ length: 100 })
  Name: string;

}
