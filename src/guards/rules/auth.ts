import { rule } from "graphql-shield";


export const isAuthorized = rule()(async (parent, args, ctx, info) => {
  const { authorization } = ctx.request.headers;
  if (!authorization) {
    return false;
  }

  const token = authorization.replace("Bearer", "").trim();

  // const { userId } = verifyToken(token);

  return !!token;
});