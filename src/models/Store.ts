import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Address } from './Address';
import { StoreFeature } from './StoreFeature';
import { Generic } from './Generic';

@Entity({ name: "Stores" })
export class Store extends Generic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ length: 50 })
  name: string;

  @Column({ nullable: true })
  addressId: number;

  @Column()
  isActive: boolean;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Address)
  address: Address;

  @OneToMany(() => StoreFeature, storeFeature => storeFeature.store)
  storeFeatures: StoreFeature[];
}
