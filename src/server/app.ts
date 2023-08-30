import GraphQL from "./graphql";

export class BackendApp {
  async start (): Promise<void> {
    new GraphQL();
  }
}
