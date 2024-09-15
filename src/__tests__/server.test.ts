import server, { connectDB } from "../server";
import db from "../config/db";

jest.mock("../config/db");

describe("connectDB", () => {
	it("Should handle DB connection error", async () => {
		jest
			.spyOn(db, "authenticate") // Importa la conexion, espera a que se conecte
			.mockRejectedValueOnce(new Error("Error al conectar a la base de datos")); // y luego con el mock lanzamos una excepcion para que vaya al catch

		const consoleSpy = jest.spyOn(console, "log");

		await connectDB();

		expect(consoleSpy).toHaveBeenCalledWith(
			expect.stringContaining("Error al conectar a la base de datos")
		); // El mensaje de error que esperamos
	});
});
