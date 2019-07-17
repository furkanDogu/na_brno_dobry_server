import { User } from "../../entity/User";
import { Category } from "../../entity/Category";
import { Product } from "../../entity/Product";

import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import { JWT_KEY } from "../../constants";

import { LogınInfo, NewProductInfo } from "./types";

import { getUserId, getAdminId } from "../../util";
import { ContextParameters } from "graphql-yoga/dist/types";

const registerUser = async (
  _: User,
  { role, name, surname, email, birthday, password }: User
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = User.create({
    email,
    birthday,
    name,
    surname,
    role,
    password: hashedPassword
  });

  const res = await user.save();

  const token = jwt.sign(
    { id: res.id, email: res.email, role: res.role },
    JWT_KEY
  );

  return {
    token
  };
};

const login = async (_: User, { email, password }: LogınInfo) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Email doesn't exist");

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) throw new Error("Wrong password !");

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_KEY
  );

  return {
    token
  };
};

// admin can add product for other users
const addProduct = async (
  _: Product,
  { name, price, categoryId, ownerId }: NewProductInfo,
  context: ContextParameters
) => {
  //checks if authenticated
  getUserId(context);

  const owner = await User.findOne({ where: { id: ownerId } });

  const category = await Category.findOne({
    where: { id: categoryId }
  });
  if (!category) throw new Error(`Category with id ${categoryId} wasn't found`);

  const productCandidate = Product.create({
    category,
    owner,
    name,
    price
  });

  return productCandidate.save();
};

const addCategory = async (
  _: Category,
  { name }: Category,
  context: ContextParameters
) => {
  await getAdminId(context);
  const categoryCandidate = Category.create({
    name
  });
  return categoryCandidate.save();
};

const changePassword = async (
  _: User,
  { password }: User,
  context: ContextParameters
) => {
  const user = await User.findOne(getUserId(context));
  if (!user) throw new Error("User wasn't found in the db");

  user.password = await bcrypt.hash(password, 10);

  await user.save();

  return true;
};

const checkOwner = async (ownerId: string, productId: string) => {
  const product = await Product.findOne({
    where: { id: productId },
    relations: ["owner"]
  });
  if (!product) throw new Error(`Product with ${productId} id wasn't found`);
  return product!.owner.id === ownerId;
};

const updateProduct = async (
  _: Product,
  { name, price, categoryId, productId }: NewProductInfo,
  context: ContextParameters
) => {
  // if the user owns the product that is wanted to change or if user is admin
  if (
    checkOwner(getUserId(context), productId!) ||
    (await getAdminId(context))
  ) {
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) throw new Error("Product with given id wasn't found");

    const category = await Category.findOne({ where: { id: categoryId } });
    if (!category)
      throw new Error(`Category with id ${categoryId} wasn't found`);

    if (category) product.category = category;

    if (name) product.name = name;

    if (price) product.price = price;

    return await Product.save(product);
  }

  throw new Error("Only admin and product owner can change product info");
};

export default {
  registerUser,
  login,
  addProduct,
  addCategory,
  changePassword,
  updateProduct
};
