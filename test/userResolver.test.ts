import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../src/graphql/types";
import { resolvers } from "../src/graphql/resolvers";
describe('User Resolver', () => {
  it('should return user by email', async () => {
    const testServer = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const response = await testServer.executeOperation({
      query: `query {
        getUserByEmail(email: "michael.white@test.com") {
          id
          email
        }
      }`,
    });
    expect(response.body.kind).toEqual('single');
    console.log(response.body);
  });
});
