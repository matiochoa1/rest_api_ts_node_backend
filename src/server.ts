import express from "express";
import router from "./router";
import colors from "colors";
import db from "./config/db";

// Connect to db
async function connectDB() {
	try {
		await db.authenticate();
		db.sync();
		console.log(colors.bgGreen.bold.white("Conectado a la base de datos"));
	} catch (error) {
		console.log(error);
		console.log(
			colors.bgRed.bold.white("Error al conectar a la base de datos")
		);
	}
}

connectDB();
const server = express();

server.use("/api/products", router);

export default server;
