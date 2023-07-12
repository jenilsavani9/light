import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: "StoreFeatures" })
export class StoreFeature {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  FeatureId: number;

  @Column()
  StoreId: number;

  @Column()
  Status: boolean;

}
