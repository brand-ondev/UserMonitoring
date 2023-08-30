import prisma from "db/prisma";
import {isValidEmail} from "utils/validations";
import {GraphQLError} from "graphql";
import { PrismaClient, User } from "@prisma/client";
import {Pagination} from "types"
export default class UserService {
	static async getUserByEmail( email: string, database: PrismaClient) {
		if (!isValidEmail(email)) {
			throw new GraphQLError("Invalid email");
		}
		const user =
			await database.$queryRaw<User[]>`SELECT * FROM "User" WHERE "email" = ${email}`;
		if (!user) {
      throw new GraphQLError("User not found");
		}
		return user[0];
	}

	static async getAllUsers(pagination: Pagination, database: PrismaClient) {
		const { first, offset } = pagination;
		const users = await database.user.findMany({
			skip: offset,
			take: first,
			include: {
				Role: true,
				Country: true,
			},
		});

    if (!users) {
      throw new GraphQLError("Users not found");
		}
		return users;
	}

	static async getCountryByUserId(userid: string) {
		if (typeof userid !== "string") {
      throw new GraphQLError("Invalid  ID ");
		}
		const data = await prisma.user
			.findUnique({where: {id: userid}})
			.Country();

		if (!data) {
      throw new GraphQLError("Not found");

		}
		return data;
	}

	static async getRoleByUserId(userid: string) {
		if (typeof userid !== "string") {
			throw new GraphQLError("Invalid ID ");
		}
		const role =
			await prisma.user.findUnique({where: {id: userid}}).Role();
		if (!role) {
      throw new GraphQLError("Role not found");
		}
		return role
	}

	static async getUserMonitoringByUserId(userid: string) {
		if (typeof userid !== "string") {
      throw new GraphQLError("Invalid USER ID ");

		}

    const userMonitoring =
			await prisma.userMonitoring.findMany({where: {userId: userid}});
		if (!userMonitoring) {
      throw new GraphQLError("Monigtoring not found ");

		}
		return userMonitoring
	}
}
