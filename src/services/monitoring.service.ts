import prisma from "db/prisma";
import { isValidDate, isValidEmail } from "utils/validations";

export default class MonitoringService {
	static async getUserMonitoring(
		email: string,
		startDate: string,
		endDate: string
	) {
    if (!isValidEmail(email)) {
      return {
        __typename: 'InvalidEmailError',
        message: 'Invalid email'
      }
    }
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      return {
        __typename: 'InvalidDateError',
        message: 'Invalid date'
      }
    }
		return await prisma.$queryRaw`SELECT * FROM UserMonitoring WHERE email = ${email} AND createdAt BETWEEN ${startDate} AND ${endDate}`;
	}

	static async getTopUsersByMonitoring(startDate: string, endDate: string) {
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      return {
        __typename: 'InvalidDateError',
        message: 'Invalid date'
      }
    }
		return await prisma.$queryRaw`select U.id, U.email, Count(UM.id) as total_records
    From User U
    Join UserMonitoring UM on U.id = UM.userId
    WHERE UM.createdAt >= ${startDate} AND UM.createdAt <= ${endDate}
    GROUP BY U.id, U.email
    ORDER BY total_records DESC
    LIMIT 3`;
	}

	static async getTopUsersByEventType(
		countryId: string,
		eventType: string,
		startDate: string,
		endDate: string
	) {
		return await prisma.$queryRaw`SELECT U.id, U.email, COUNT(UM.id) as total_records
    FROM User U
    JOIN UserMonitoring UM ON U.id = UM.userId
    JOIN _CountryToUser CTU ON U.id = CTU.userId
    WHERE UM.eventType = ${eventType}
      AND CTU.countryId = ${countryId}
      AND UM.timestamp >= ${startDate} AND UM.timestamp <= ${endDate}
    GROUP BY U.id, U.email
    ORDER BY total_records DESC
    LIMIT 3
    `;
	}
}
