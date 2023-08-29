import prisma from "db/prisma";
import {isValidEmail} from "utils/validations";

export default class UserService {
	static async getUserByEmail(email: string) {
		if (!isValidEmail(email)) {
			return {
				__typename: "InvalidEmailError",
				message: "Invalid email",
			};
		}
		const user =
			await prisma.$queryRaw`SELECT * FROM user WHERE email = ${email}`;
		if (!user) {
			return {
				__typename: "NotFoundError",
				message: "User not found",
			};
		}
		return {
			__typename: "User",
			...user,
		};
	}

	static async getAllUsers() {
		const users =
			await prisma.$queryRaw`SELECT DISTINCT ON (u.id) u.*, r.name as roleName, c.name as countryName
    FROM "User" u
    JOIN "Role" r ON u."roleId" = r.id
    LEFT JOIN "_CountryToUser" cu ON u.id = cu."A"
    LEFT JOIN "Country" c ON cu."B" = c.id;`;
		if (!users) {
			return {
				__typename: "NotFoundError",
				message: "Users not found",
			};
		}
		return users;
	}

	static async createUser(email: string, roleId: string) {
		if (!isValidEmail(email)) {
			return {
				__typename: "InvalidEmailError",
				message: "Invalid email",
			};
		}
		if (typeof roleId !== "string") {
			return {
				__typename: "InvalidIdError",
				message: "Invalid id",
			};
		}

		// return prisma.user.create({ { email, roleId } });
	}

	static async getCountryByUserId(userid: string) {
		if (typeof userid !== "string") {
			return {
				__typename: "InvalidIdError",
				message: "Invalid id",
			};
		}
		const data = await prisma.user
			.findUnique({where: {id: userid}})
			.Country();

		if (!data) {
			return {
				__typename: "NotFoundError",
				message: "Country not found",
			};
		}
		return data;
	}

	static async getRoleByUserId(userid: string) {
		if (typeof userid !== "string") {
			return {
				__typename: "InvalidIdError",
				message: "Invalid id",
			};
		}
		const role =
			await prisma.user.findUnique({where: {id: userid}}).Role();

		if (!role) {
			return {
				__typename: "NotFoundError",
				message: "Role not found",
			};
		}
		return role
	}

	static async getUserMonitoringByUserId(userid: string) {
		if (typeof userid !== "string") {
			return {
				__typename: "InvalidIdError",
				message: "Invalid id",
			};
		}

    const userMonitoring =
			await prisma.userMonitoring.findMany({where: {userId: userid}});
		if (!userMonitoring) {
			return {
				__typename: "NotFoundError",
				message: "UserMonitoring not found",
			};
		}
		return userMonitoring
	}
}
