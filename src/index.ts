import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";

import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import Product from "./resolvers/Product";
import Category from "./resolvers/Category";

const resolvers = {
  Query,
  Mutation,
  User,
  Product,
  Category
};

const server = new GraphQLServer({
  typeDefs: "./src/schemas.graphql",
  resolvers,
  context: request => ({
    ...request
  })
});

createConnection().then(() => {
  server.start(() => console.log("Server is running on localhost:4000"));
});
