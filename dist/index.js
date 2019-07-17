"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const graphql_yoga_1 = require("graphql-yoga");
const typeorm_1 = require("typeorm");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const resolvers = {
    Query,
    Mutation
};
const server = new graphql_yoga_1.GraphQLServer({
    typeDefs: "./src/schemas.graphql",
    resolvers
});
typeorm_1.createConnection().then(() => {
    server.start(() => console.log("Server is running on localhost:4000"));
});
//# sourceMappingURL=index.js.map