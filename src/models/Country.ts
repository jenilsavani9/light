import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: "Countries" })
export class Country {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 50 })
  Name: string;
}
