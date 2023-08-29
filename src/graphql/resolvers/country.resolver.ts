import CountryService from "services/country.service";

const countryResolvers = {
  Query: {
    getAllCountries: async () => {
      return await CountryService.getAllCountries();
    }
  },
  Country: {
    users: async (parent: any) => {
      return await CountryService.getUsersByCountryId(parent.id);
    },
  },
};

export default countryResolvers;