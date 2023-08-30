import { PrismaClient } from "@prisma/client";
import prisma from "db/prisma";
import { GraphQLError } from "graphql";
import { Pagination } from "types";

export default class CountryService {
  static async getAllCountries(pagination: Pagination, db: PrismaClient) {
    const { first, offset } = pagination;
    return await db.$queryRaw`SELECT * FROM public."Country" OFFSET ${offset} LIMIT ${first}`;
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
