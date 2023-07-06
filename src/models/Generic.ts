import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class Generic {
  @CreateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  CreatedAt!: Date;

  @UpdateDateColumn({ type: "datetime", nullable: true })
  UpdatedAt?: Date;
}
