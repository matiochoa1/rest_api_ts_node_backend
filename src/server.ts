import express from "express";
import router from "./router";
import colors from "colors";
import swaggerUi, { SwaggerUiOptions } from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import db from "./config/db";

// Connect to db
export async function connectDB() {
	try {
		await db.authenticate();
		db.sync();
		// console.log(colors.bgGreen.bold.white("Conectado a la base de datos"));
	} catch (error) {
		console.log(error);
		console.log(
			colors.bgRed.bold.white("Error al conectar a la base de datos")
		);
	}
}

connectDB();
// Instancia de express
const server = express();

// Leer datos de formularios
server.use(express.json());

server.use("/api/products", router);

// Docs

server.use(
	"/docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
