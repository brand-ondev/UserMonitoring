import prisma from "db/prisma";

export default class CountryService {
  static async getAllCountries() {
    return await prisma.$queryRaw`SELECT * FROM public."Country"`;
  }

  static async getUsersByCountryId(id: string) {
    if (typeof id !== 'string') {
      return {
        __typename: 'InvalidIdError',
        message: 'Invalid id'
      }
    }
    return await prisma.$queryRaw`SELECT * FROM user WHERE countryId = ${id}`;
  }
}
