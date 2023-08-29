import prisma from "db/prisma";

export const createUser = async (_: any, { data }: any) => {
      return prisma.user.create({ data });
};
