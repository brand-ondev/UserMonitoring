import countryResolvers from "./country.resolver"
import userResolvers from "./user.resolver"
import monitoringResolvers from "./monitoring.resolver"

export const resolvers = {
  ...countryResolvers,
  ...userResolvers,
  ...monitoringResolvers
}
