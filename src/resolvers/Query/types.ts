export enum ProductOrderCrits {
  name_ASC = "name_ASC",
  name_DESC = "name_DESC",
  price_ASC = "price_ASC",
  price_DESC = "price_DESC",
  createdAt_ASC = "createdAt_ASC",
  createdAt_DESC = "createdAt_DESC"
}

export type ProductQueryCrits = {
  own: Boolean;
  orderBy: ProductOrderCrits;
  skip: Number;
  take: Number;
  filter: String;
};
