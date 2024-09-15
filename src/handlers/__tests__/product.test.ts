import request from "supertest";
import server from "../../server";
import e from "express";

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

// TESTS - GET BY ID
describe("GET - Product by ID", () => {
	it("Should return a 404 for a non existent product", async () => {
		const productId = 2000;
		const response = await request(server).get(`/api/products/${productId}`);

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toBe("Producto no encontrado");
	});

	it("Should check a valid ID in the URL", async () => {
		const response = await request(server).get("/api/products/not-valid-url");

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors[0].msg).toBe("El id debe ser un numero");
	});

	it("Should return a JSON with the product", async () => {
		const productId = 1;
		const response = await request(server).get(`/api/products/${productId}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("data");
	});
});

// TESTS - UPDATE
describe("PUT - Product", () => {
	it("Should check that a valid ID is passed in the URL", async () => {
		const response = await request(server)
			.put("/api/products/not-valid-url")
			.send({
				name: "Monitor Piola",
				price: 300,
				available: true,
			});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors[0].msg).toBe("El id debe ser un numero");

		expect(response.status).not.toBe(200);
		expect(response.status).not.toHaveProperty("data");
	});

	it("Should display validation error messages", async () => {
		const response = await request(server).put("/api/products/1").send({});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toBeTruthy();

		expect(response.status).not.toBe(200);
		expect(response.status).not.toHaveProperty("data");
	});

	it("Should check that the price is greater than 0", async () => {
		const response = await request(server).put("/api/products/1").send({
			name: "Monitor Piola",
			price: -300,
			available: true,
		});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toBeTruthy();

		expect(response.status).not.toBe(200);
	});

	it("Should return a 404 for a non existent product", async () => {
		const productId = 2000;
		const response = await request(server)
			.put(`/api/products/${productId}`)
			.send({
				name: "Monitor Piola",
				price: 300,
				available: true,
			});

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toBe("Producto no encontrado");

		expect(response.status).not.toBe(200);
		expect(response.status).not.toHaveProperty("data");
	});
});

// TESTS - PATCH
describe("PATCH - product by id", () => {
	it("Should return a 404 for a non existent product", async () => {
		const productId = 2000;
		const response = await request(server).patch(`/api/products/${productId}`);

		expect(response.status).toBe(404);
		expect(response.body.message).toBe("Producto no encontrado");

		expect(response.status).not.toBe(200);
		expect(response.status).not.toHaveProperty("data");
	});

	it("Should update the product availability", async () => {
		const productId = 1;
		const response = await request(server).patch(`/api/products/${productId}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("data");

		expect(response.status).not.toBe(404);
		expect(response.status).not.toBe(400);
	});
});

// TESTS - DELETE
describe("DELETE - Product", () => {
	it("Should check that a valid ID is passed in the URL", async () => {
		const response = await request(server).delete(
			"/api/products/not-valid-url"
		);
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors[0].msg).toBe("El id debe ser un numero");

		expect(response.status).not.toBe(200);
		expect(response.status).not.toHaveProperty("data");
	});

	it("Should return a 404 for a non existent product", async () => {
		const productId = 2000;
		const response = await request(server).delete(`/api/products/${productId}`);

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toBe("Producto no encontrado");

		expect(response.body).not.toHaveProperty("data");
		expect(response.status).not.toBe(200);
	});

	it("Should delete a product", async () => {
		const productId = 1;
		const response = await request(server).delete(`/api/products/${productId}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("data");
		expect(response.body.data).toBe("Producto eliminado");

		expect(response.status).not.toBe(400);
		expect(response.status).not.toBe(404);
	});
});
