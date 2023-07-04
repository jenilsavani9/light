import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

enum Status {
  active = 0,
  deactive = 1,
  pending = 2,
}

enum Roles {
  admin = 0,
  customer = 1,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 20 })
  firstName!: string;

  @Column({ length: 20 })
  lastName!: string;

  @Column({ length: 50 })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: "enum", enum: Status, default: Status.pending })
  status!: number;

  @Column({ type: "enum", enum: Roles, default: Roles.customer })
  role!: number;

  @Column({ nullable: true })
  lastLogin?: string;
}
