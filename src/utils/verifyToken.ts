import prisma from "db/prisma";
import { User, Session } from "@prisma/client";

export const verifyToken = async (token: string) => {
  const session = await  prisma.$queryRaw<Session>`SELECT * FROM Session WHERE session = ${token}`;
  if (session) {
    const user = await prisma.$queryRaw<User>`SELECT * FROM User WHERE id = ${session.userId}`;
    return {user, session};
  }
  return null;
}
