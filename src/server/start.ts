import { BackendApp } from "./app";
import prisma from "db/prisma";
try {
	const app = new BackendApp();
	app.start().catch((error: any) => {
		if (error.code === "EADDRINUSE") {
			console.log("Port already in use");
		} else {
			console.error(error);
		}
	}).finally(async () => {
    await prisma.$disconnect();
  });
} catch (error: any) {
	console.log(error);
}
