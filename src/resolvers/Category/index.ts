import { Product } from "../../entity/Product";
import { Category } from "../../entity/Category";

const products = async (category: Category) => {
  const products = await Product.find({ where: { category } });
  return products;
};

export default {
  products
};
