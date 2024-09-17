import express from "express";
import router from "./router";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
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

// Permitir cors
const corsOptions: CorsOptions = {
	// quien envia la peticion
	origin: function (origin, callback) {
		if (origin === process.env.FRONTEND_URL) {
			callback(null, true); // primer parametro es el error, segundo es si permitimos la conexion
		} else {
			callback(new Error("No permitido por CORS"));
		}
	},
};

server.use(cors(corsOptions));

// Leer datos de formularios
server.use(express.json());

// Morgan
server.use(morgan("dev"));

server.use("/api/products", router);

// Docs

server.use(
	"/docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
