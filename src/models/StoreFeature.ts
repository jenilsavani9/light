import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Feature } from './Feature';
import { Store } from './Store';

@Entity()
export class StoreFeature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  featureId: number;

  @Column()
  storeId: number;

  @Column()
  status: boolean;

  @ManyToOne(() => Feature)
  feature: Feature;

  @ManyToOne(() => Store)
  store: Store;
}
