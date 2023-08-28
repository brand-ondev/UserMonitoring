import {ApolloServerPluginDrainHttpServer} from "apollo-server-core";
import {ApolloServer} from "apollo-server-express";
import {applyMiddleware} from "graphql-middleware";

// midlewares argument was added to the createApolloServer function
type Options = {
	httpServer: any;
	schema: any;
	app: any;
};
export const createApolloServer = (
	midlewares: any,
	{httpServer, schema, app}: Options
) => {
	const schemaWithPermissions = applyMiddleware(schema, ...midlewares);
	const server = new ApolloServer({
		schema: schemaWithPermissions,
		context: ({request, reply}: any) => ({
			request,
			reply,
		}),

		plugins: [
			ApolloServerPluginDrainHttpServer({
				httpServer,
			}),
			{
				serverWillStart: async () => {
					return {
						drainServer: async () => {
							await httpServer.close();
						},
					};
				},
			},
		],
	});
	return server;
};
