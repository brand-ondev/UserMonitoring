import MonitoringService from "services/monitoring.service";
import {MyContext} from "types";
import {GraphQLError} from "graphql";
import { PrismaClient } from "@prisma/client";

const monitoringResolvers = {
	Query: {
		getUserMonitoring: async (
			_: any,
			{email, startDate, endDate}: any,
			{database}: MyContext
		) => {
			return await MonitoringService.getUserMonitoring(
				email,
				startDate,
				endDate,
				database  as PrismaClient
			);
		},
		getTopUsersByMonitoring: async (
			_: any,
			{startDate, endDate}: any,
			{role, database}: MyContext
		) => {
			if (role?.name === "Admin" || role?.name === "Manager")
				return await MonitoringService.getTopUsersByMonitoring(
					startDate,
					endDate,
					database  as PrismaClient
				);
			else {
				throw new GraphQLError(
					"You are not authorized to perform this action"
				);
			}
		},
		getTopUsersByEventType: async (
			_: any,
			{countryId, eventType, startDate, endDate}: any,
			{role, database}: MyContext
		) => {
			if (role?.name === "Admin")
				return await MonitoringService.getTopUsersByEventType(
					countryId,
					eventType,
					{startDate, endDate},
					database as PrismaClient
				);
			else {
				throw new GraphQLError(
					"You are not authorized to perform this action"
				);
			}
		},
	},
};

export default monitoringResolvers;
