const countryResolvers = {
  Query: {
    getAllCountries: async () => {
      // return prisma.country.findMany();
    },
  Country: {
    users: async (parent: any) => {
      // return prisma.country.findUnique({ where: { id: parent.id } }).users();
    },
  },
  }
};

export default countryResolvers;