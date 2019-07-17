import { ContextParameters } from "graphql-yoga/dist/types";
import * as jwt from "jsonwebtoken";
import { JWT_KEY } from "./constants";
import { User } from "./entity/User";
import { ProductOrderCrits } from "./resolvers/Query/types";

// write first error states for more readable code
export const getUserId = (context: ContextParameters): string => {
  const auth_token = context.request.get("auth_token");
  if (auth_token) {
    return jwt.verify(auth_token, JWT_KEY) as string;
  }
  throw new Error("auth_token is required");
};

export const getAdminId = async (context: ContextParameters) => {
  const admin_id = getUserId(context);
  const admin = await User.findOne({ where: { id: admin_id, role: "admin" } });

  if (admin) return admin;

  throw new Error("Admin role is required");
};

export const decodeOrder = (order: ProductOrderCrits) => {
  const orderArr = order.split("_");
  return {
    [orderArr[0]]: orderArr[1]
  };
};
