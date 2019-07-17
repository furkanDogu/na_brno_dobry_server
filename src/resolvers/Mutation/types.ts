export type LogınInfo = {
  email: string;
  password: string;
};

export type NewProductInfo = {
  name: string;
  ownerId: string;
  categoryId: string;
  price: number;
  productId?: string;
};
