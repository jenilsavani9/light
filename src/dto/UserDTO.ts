import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "Users" })
export class UserDTO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

}
