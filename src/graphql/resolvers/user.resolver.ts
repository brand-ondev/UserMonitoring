import { createUser } from "graphql/mutations/createUser.mutation";

const userResolvers = {
  Query: {
    getUserByEmail: async ({ email }: any) => {
      // return prisma.user.findUnique({ where: { email } });
    },
    getAllUsers: async () => {
      // return prisma.user.findMany();
    },
    User: {
      countries: async (parent: any) => {
        // return prisma.user.findUnique({ where: { id: parent.id } }).countries();
      },
      userMonitoring: async (parent: any) => {
        // return prisma.user.findUnique({ where: { id: parent.id } }).userMonitoring();
      },
      role: async ( parent: any) => {
        // return prisma.user.findUnique({ where: { id: parent.id } }).role();
      },
    },
  },
  Mutation: {
    createUser: createUser,
  },
};

export default userResolvers;