import CountryService from "services/country.service";
import { MyContext } from "types";
import { GraphQLError } from "graphql";
import { PrismaClient } from "@prisma/client";

const countryResolvers = {
  Query: {
    getAllCountries: async (_:any,__: any, {role, database}: MyContext ) => {
      if (role?.name === "Admin" || role?.name === "Manager") return await CountryService.getAllCountries(database as PrismaClient);
      else {
        throw new GraphQLError("Not Authorized")
      }
      },
  },
  Country: {
    users: async (parent: any) => {
      return await CountryService.getUsersByCountryId(parent.id);
    },
  },
};

export default countryResolvers;