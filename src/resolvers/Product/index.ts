import { Product } from "./../../entity/Product";

const category = async (product: Product) => {
  const productFound = await Product.findOne({
    where: { id: product.id },
    relations: ["category"]
  });
  return productFound!.category;
};

const owner = async (product: Product) => {
  const productFound = await Product.findOne({
    where: { id: product.id },
    relations: ["owner"]
  });

  return productFound!.owner;
};

export default {
  category,
  owner
};
