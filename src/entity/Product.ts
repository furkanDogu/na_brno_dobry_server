import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  ManyToOne
} from "typeorm";
import * as uuidv4 from "uuid/v4";
import { User } from "./User";
import { Category } from "./Category";

@Entity()
export class Product extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  name: string;

  @ManyToOne(() => User, user => user.products)
  owner: User;

  @Column("float")
  price: number;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
