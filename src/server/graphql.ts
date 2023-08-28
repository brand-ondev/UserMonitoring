import {typeDefs} from "graphql/types/index";
import {resolvers} from "graphql/resolvers/index";
import {makeExecutableSchema} from "@graphql-tools/schema";
import {createApolloServer} from "./apollo";
import {permissions} from "../guards/index";
import { HTTPServer } from "./http";

export default class GraphQL {
	private server: any;
	private readonly _app: any;
	private readonly _httpServer: HTTPServer;
	private readonly _schema: any;

	constructor(app: any, httpServer: any) {
		this._app = app;
		this._httpServer = httpServer;
		this._schema = makeExecutableSchema({
			typeDefs,
			resolvers,
		});
		this.server = createApolloServer([permissions], {
			httpServer: this._httpServer,
			schema: this._schema,
			app: this._app,
		});
		this.startApolloServer();
	}

	async startApolloServer(): Promise<void> {
		await this.server.start();
		this.server.applyMiddleware({app: this._app});
	}
}
