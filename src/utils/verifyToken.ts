import prisma from "db/prisma";
import {  Session } from "@prisma/client";

export const verifyToken = async (token: string) => {
  const session = await  prisma.$queryRaw<Session[]>`SELECT * FROM public."Session" WHERE "sessionToken" = ${token}`;
  if (session.length > 0) {
    const user = await prisma.user.findFirst({
      where: {
        id: session[0].userId
      }
    });
    if (!user) {
      return null;
    }
    return {user, session: session[0] ?? null};
  }
  return null;
}
