import { PrismaClient } from "@prisma/client";
import prisma from "db/prisma";
import { GraphQLError } from "graphql";

export default class CountryService {
  static async getAllCountries(db: PrismaClient) {
    return await db.$queryRaw`SELECT * FROM public."Country"`;
  }

  static async getUsersByCountryId(id: string) {
    if (typeof id !== 'string') {
      throw new GraphQLError('Invalid ID');
    }
    return await prisma.user.findMany({
      where: {
        Country: {
          some: {
            id: id
          }
        }
      }
    });
  }
}
