import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Generic } from "./Generic";

export enum Status {
  active,
  deactive,
  pending,
}

export enum Roles {
  admin,
  customer,
}

@Entity({ name: "Users" })
export class User extends Generic {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 20 })
  FirstName: string;

  @Column({ length: 20 })
  LastName: string;

  @Column({ length: 50 })
  Email: string;

  @Column()
  Password: string;

  @Column({
    type: "int",
    enum: Status,
    default: Status.pending,
  })
  Status: Status;

  @Column({
    type: "int",
    enum: Roles,
    default: Roles.customer,
  })
  Role: Roles;

  @Column({ nullable: true })
  LastLogin: string | null;
}
