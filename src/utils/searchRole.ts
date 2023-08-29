import prisma from "db/prisma";
import { Role } from "@prisma/client";

export const searchRole = async (roleId: string) => {
  const role = await prisma.$queryRaw<Role>`SELECT * FROM Role WHERE id = ${roleId}`;
  return role;
}
