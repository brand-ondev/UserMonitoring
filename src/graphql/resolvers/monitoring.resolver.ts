import MonitoringService from "services/monitoring.service";

const monitoringResolvers = {
  Query: {
    getUserMonitoring: async (_: any, { email, startDate, endDate }: any) => {
      return await MonitoringService.getUserMonitoring(email, startDate, endDate);
    },
    getTopUsersByMonitoring: async (_: any, { startDate, endDate }: any) => {
      return await MonitoringService.getTopUsersByMonitoring(startDate, endDate);
    },
    getTopUsersByEventType: async (_: any, { countryId, eventType, startDate, endDate }: any) => {
      return await MonitoringService.getTopUsersByEventType(countryId, eventType, startDate, endDate);
    },
  },
};

export default monitoringResolvers;