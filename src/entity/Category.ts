import {
  Entity,
  Column,
  BaseEntity,
  PrimaryColumn,
  OneToMany,
  BeforeInsert
} from "typeorm";
import { Product } from "./Product";
import * as uuidv4 from "uuid/v4";

@Entity()
export class Category extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  name: string;

  @OneToMany(() => Product, product => product.category)
  products: Product[];

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
