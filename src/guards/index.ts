import { shield } from "graphql-shield";
import { isAuthorized } from './rules/auth'

export const permissions = shield({
  Query: {
  },
  Mutation: {
    createUser: isAuthorized,
  },
});