import request from "supertest";
import server from "../server";

describe("Suma 1 + 1 es 2", () => {
	it("Debería retornar 2", () => {
		expect(1 + 1).toBe(2);
	});
});
