import { User } from "../../entity/User";
import { Product } from "../../entity/Product";

const products = async (user: User) =>
  Product.find({ where: { owner: user.id } });

export default {
  products
};
