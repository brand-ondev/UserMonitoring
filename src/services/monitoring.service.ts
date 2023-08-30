import {isValidDate, isValidEmail} from "utils/validations";
import {GraphQLError} from "graphql";
import {TopUser} from "types";
import { PrismaClient } from "@prisma/client";

export default class MonitoringService {
	static async getUserMonitoring(
		email: string,
		startDate: string,
		endDate: string,
		database: PrismaClient
	) {
		if (!isValidEmail(email)) {
			throw new GraphQLError("Invalid Email");
		}
		if (!isValidDate(startDate) || !isValidDate(endDate)) {
			throw new GraphQLError("Invalid Date");
		}
		return await database.$queryRaw`SELECT u."email", um.*
    FROM public."UserMonitoring" um
    JOIN public."User" u ON u."id" = um."userId"
    WHERE u."email" = ${email} AND um."createdAt" BETWEEN CAST(${startDate} AS timestamp) AND CAST(${endDate} AS timestamp)`;
	}

	static async getTopUsersByMonitoring(startDate: string, endDate: string,database: PrismaClient) {
		if (!isValidDate(startDate) || !isValidDate(endDate)) {
			throw new GraphQLError("Invalid Date");
		}
		const top = await database.$queryRaw<
			TopUser[]
		>`select U.id, U.email, U.name, Count(UM.id) as "totalRecords"
    From "User" U
    Join "UserMonitoring" UM on U.id = UM."userId"
    WHERE UM."createdAt" BETWEEN CAST(${startDate} AS timestamp) AND CAST(${endDate} AS timestamp)
    GROUP BY U.id, U.email
    ORDER BY "totalRecords" DESC
    LIMIT 3`;

		top.forEach((item) => {
			item.totalRecords = Number(item.totalRecords);
		});
		return top;
	}

	static async getTopUsersByEventType(
		countryId: string,
		eventType: string,
		timestamp: {
			startDate: string;
			endDate: string;
		},
		database: PrismaClient
	) {
		const {startDate, endDate} = timestamp;
		const top =
			await database.$queryRaw<any[]>`SELECT U.*, COUNT(UM.id) as "totalRecords"
    FROM "User" U
    JOIN "UserMonitoring" UM ON U.id = UM."userId"
    JOIN "_CountryToUser" CTU ON U.id = CTU."B"
    WHERE UM.description = ${eventType}
      AND CTU."A" = ${countryId}
      AND UM."createdAt" BETWEEN CAST(${startDate} AS timestamp) AND CAST(${endDate} AS timestamp)
    GROUP BY U.id, U.email
    ORDER BY "totalRecords" DESC
    LIMIT 3
    `;
		top.forEach((item) => {
			item.totalRecords = Number(item.totalRecords);
		});
		return top;
	}
}
