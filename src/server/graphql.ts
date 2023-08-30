import {createApolloServer} from "./apollo";
import {startStandaloneServer} from "@apollo/server/standalone";
import {verifyToken} from "utils/verifyToken";
import {searchRole} from "utils/searchRole";
import {GraphQLError} from "graphql";
import {ApolloServer} from "@apollo/server";
import {MyContext} from "types";
import prisma from "db/prisma";

export default class GraphQL {
	private server: ApolloServer<MyContext>;

	constructor() {
		this.server = createApolloServer();
		this.startApolloServer();
	}

	async startApolloServer(): Promise<void> {
		const {url} = await startStandaloneServer<MyContext>(this.server, {
			listen: {
				port: 4000,
				path: "/graphql",
			},
			context: async ({req, res}) => {
				if ((req as any).body.operationName === "IntrospectionQuery") {
					return {database: prisma};
				}
				const authorization = req.headers["authorization"];
				const token = authorization?.replace("Bearer", "").trim();
				const isTokenValid = await verifyToken(token ?? "");
				if (!isTokenValid?.session) {
					throw new GraphQLError("No authorization header", {
						extensions: {
							code: "UNAUTHENTICATED",
						},
					});
				}
				const {user, session} = isTokenValid;
				const role = await searchRole(user.roleId ?? "");
				return {database: prisma, user, session, role};
			},
		});
    console.log(`🚀 Server ready at ${url}`);
	}
}
