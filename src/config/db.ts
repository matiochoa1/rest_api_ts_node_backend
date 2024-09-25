import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
	models: [__dirname + "/../models/**/*"],
	dialectOptions: {
		ssl: {
			require: false,
		},
	},
	logging: false,
});

export default db;
