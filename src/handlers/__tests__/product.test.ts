import request from "supertest";
import server from "../../server";

// TESTS - GET
describe("GET - Products", () => {
	it("Should check that the api/products url exists", async () => {
		const response = await request(server).get("/api/products");

		expect(response.status).not.toBe(404);
	});

	it("Should return an array with products", async () => {
		const response = await request(server).get("/api/products");

		expect(response.status).toBe(200);
		expect(response.body.data).toMatchObject(expect.any(Array));

		expect(response.body.data).not.toBe(null);
		expect(response.body).not.toHaveProperty("errors");
	});
});

// TESTS - POST
describe("POST - Product", () => {
	it("Should display validation errors", async () => {
		const response = await request(server).post("/api/products").send({});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");

		expect(response.status).not.toBe(404);
		expect(response.status).not.toBe(200);
		expect(response.status).not.toBe(201);
	});

	it("Should check that the price is greater than 0 and a number", async () => {
		const response = await request(server).post("/api/products").send({
			name: "iPhone 15 Pro",
			price: -100,
		});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");

		expect(response.status).not.toBe(404);
	});

	it("Should create a new product", async () => {
		const response = await request(server).post("/api/products").send({
			name: "Televisor Samsung 65 Pulgadas - Test",
			price: 500,
			available: true,
		});

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("data");

		expect(response.status).not.toBe(200);
		expect(response.status).not.toBe(404);
		expect(response.body.data).not.toHaveProperty("errors");
	});
});
