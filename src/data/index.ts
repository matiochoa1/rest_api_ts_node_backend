import { exit } from "node:process";
import db from "../config/db";

const clearDB = async () => {
	try {
		await db.sync({ force: true });
		console.log("Datos eliminados correctamente");
		exit(0);
	} catch (error) {
		console.log(error);
		exit(1);
	}
};

// Es un codigo que se ejecuta desde el CLI o command line tools de node

if (process.argv[2] === "--clear") {
	clearDB();
}
