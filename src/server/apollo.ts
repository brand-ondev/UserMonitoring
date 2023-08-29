import { ApolloServer } from "@apollo/server";
import { resolvers } from "graphql/resolvers";
import { typeDefs } from "graphql/types";

export const createApolloServer = () => {
	const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
	return server;
};
