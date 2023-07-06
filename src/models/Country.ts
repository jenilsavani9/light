import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: "Countries" })
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;
}
