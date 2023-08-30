import {ApolloServer} from "@apollo/server";
import {resolvers} from "graphql/resolvers";
import {typeDefs} from "graphql/types";
import {ApolloServerErrorCode} from "@apollo/server/errors";
import {MyContext} from "types";

export const createApolloServer = () => {
	const server = new ApolloServer<MyContext>({
		typeDefs,
		resolvers,
		introspection: true,
		includeStacktraceInErrorResponses: false,
		formatError: (formattedError, error) => {
			// Return a different error message
			if (
				formattedError.extensions?.code ===
				ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
			) {
				return {
					...formattedError,
					message:
						"Your query doesn't match the schema. Try double-checking it!",
				};
			}
			return formattedError;
		},
	});
	return server;
};
