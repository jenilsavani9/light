import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export class Generic {
  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date;
}
