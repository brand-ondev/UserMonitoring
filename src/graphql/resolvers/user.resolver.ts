import { PrismaClient } from "@prisma/client";
import UserService from "services/user.service";
import {MyContext, Pagination} from "types";

const userResolvers = {
  Query: {
    getUserByEmail: async (_: any,{ email }: any, {database}: MyContext) => {
      return await UserService.getUserByEmail(email, database as PrismaClient);
    },
    getAllUsers: async (_: any, {pagination}: any, {database}: MyContext): Promise<any> => {
      return await UserService.getAllUsers(pagination as Pagination, database as PrismaClient);
    },
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