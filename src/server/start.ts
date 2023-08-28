import { BackendApp } from "./app";

try {
	const app = new BackendApp();
	app.start().catch((error: any) => {
		if (error.code === "EADDRINUSE") {
			console.log("Port already in use");
		} else {
			console.error(error);
		}
	});
} catch (error: any) {
	console.log(error);
}
