import { PrismaClient, Role } from "@prisma/client";

export interface Pagination {
  first: number
  offset: number
}

export interface MyContext {
	user?: any;
	session?: any;
	role?: Role;
	database: PrismaClient;
}
export interface TopUser {
  id: string
  name: string
  email: string
  totalRecords: number
  eventType: string
}