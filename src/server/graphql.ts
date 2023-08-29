import {createApolloServer} from "./apollo";
import { startStandaloneServer } from '@apollo/server/standalone';
import prisma from "db/prisma";
import { verifyToken } from "utils/verifyToken";
import { searchRole } from "utils/searchRole";

export default class GraphQL {
	private server: any;
  private dataSource: any;

	constructor(dataSource: any) {
    this.dataSource = dataSource;
		this.server = createApolloServer();
		this.startApolloServer();
	}

	async startApolloServer(): Promise<void> {
    const { url } = await startStandaloneServer(this.server, {
      context: async ({ req }) => {
        const authorization = req.headers["authorization"];
        if (!authorization) {
          return { db: this.dataSource };
        }
        const token = authorization.replace("Bearer", "").trim();
        const isTokenValid = await verifyToken(token);
        if (!isTokenValid) {
          return { db: this.dataSource };
        }
        console.log(isTokenValid);
        const {user, session} = isTokenValid;
        const role = await searchRole(user.roleId ?? "");
        return { db: this.dataSource, user, session, role }
      },
    });
    console.log(` Server ready at ${url}`);
	}
}
