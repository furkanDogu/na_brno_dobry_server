import { Like } from "typeorm";

import { User } from "../../entity/User";
import { Product } from "../../entity/Product";
import { Category } from "../../entity/Category";

import { getUserId, decodeOrder } from "./../../util";
import { ContextParameters } from "graphql-yoga/dist/types";

const hello = () => "This is kurva_server first query";

const users = async () => await User.find({ where: { role: "user" } });

// Ask any usage alternative !
const products = async (
  _: Product,
  { filter = "", take, own, skip = 0, orderBy }: any,
  context: ContextParameters
) => {
  const userId = getUserId(context);

  const order = orderBy ? decodeOrder(orderBy) : { name: "ASC" };

  const where = {
    name: Like(`%${filter}%`),
    owner: { id: "asd" }
  };

  if (own) {
    where.owner = {
      id: userId
    };
  } else {
    delete where.owner;
  }

  const products = await Product.find({
    where,
    order,
    skip,
    take
  });
  return products;
};

const categories = async (_: Product, __: null, context: ContextParameters) => {
  getUserId(context);
  return Category.find();
};

const oneProduct = async (
  _: Product,
  { id }: { id: string },
  context: ContextParameters
) => {
  getUserId(context);

  const product = await Product.findOne({ where: { id } });

  if (!product) throw new Error(`Product with ${id} id couldn't find`);

  return product;
};

const oneCategory = async (
  _: Category,
  { id }: { id: string },
  context: ContextParameters
) => {
  getUserId(context);

  const category = await Category.findOne({ where: { id } });
  if (!category) throw new Error(`Category with ${id} id couldn't find`);

  return category;
};

export default {
  hello,
  users,
  products,
  categories,
  oneProduct,
  oneCategory
};
