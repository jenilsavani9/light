import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Feature } from './Feature';
import { Store } from './Store';

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
