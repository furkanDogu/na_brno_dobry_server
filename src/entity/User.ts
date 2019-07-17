import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  OneToMany
} from "typeorm";
import * as uuidv4 from "uuid/v4";
import { Product } from "./Product";

export enum UserRole {
  ADMIN = "admin",
  USER = "user"
}

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  name: string;

  @Column("varchar", { length: 255 })
  surname: string;

  @Column("varchar", { length: 255, unique: true })
  email: string;

  @Column("varchar")
  password: string;

  @Column("date")
  birthday: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  @OneToMany(() => Product, product => product.owner)
  products: Product[];

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
