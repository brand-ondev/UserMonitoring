import { createUser } from "graphql/mutations/createUser.mutation";
import UserService from "services/user.service";

const userResolvers = {
  Query: {
    getUserByEmail: async ({ email }: any) => {
      return await UserService.getUserByEmail(email);
    },
    getAllUsers: async (_: any): Promise<any> => {
      console.log('getAllUsers');
      return await UserService.getAllUsers();
    },
  },
  Mutation: {
    createUser: createUser,
  },
  User: {
    countries: async (parent: any) => {
      return await UserService.getCountryByUserId(parent.id);
    },
    role: async (parent: any) => {
      return await UserService.getRoleByUserId(parent.id);
    },
    userMonitoring: async (parent: any) => {
      return await UserService.getUserMonitoringByUserId(parent.id);
    }
  },
};

export default userResolvers;