import GraphQL from "./graphql";
import { HTTPServer } from "./http";

export class BackendApp {
  private _server?: HTTPServer;
  private _graphqlServer?: GraphQL;

  async start (): Promise<void> {
    const port: string = '3000';
    this._server = new HTTPServer(port);
    this._graphqlServer = new GraphQL(this._server.app, this._server.httpServer);
    return await this._server.listen();
  }

  async close (): Promise<void> {
    await this._server?.httpServer.close();
  }
}
