import { Router } from "express";
import { body, param } from "express-validator";
import {
	createProduct,
	deleteProduct,
	getProductById,
	getProducts,
	updateAvailability,
	updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The product name
 *           example: Monitor Curvo de 49 Pulgadas
 *         price:
 *           type: number
 *           description: The product price
 *           example: 399
 *         available:
 *           type: boolean
 *           description: The product availability
 *           example: true
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     tags:
 *       - Products
 *     description: Return a list of products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Product'
 */

// Routing
//GET
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a Product by ID
 *     tags:
 *       - Products
 *     description: Return a Product by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       description: ID of the product to retrieve
 *       required: true
 *       schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request - Invalid ID
 */

router.get(
	"/:id",
	param("id").isInt().withMessage("El id debe ser un numero"),
	handleInputErrors,
	getProductById
);

/**
 * @swagger:
 * /api/products/{id}:
 *    put:
 *      summary: Updates a product with user inputs
 *      tags:
 *        - Products
 *      description: Updates the data of a product in the database
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the product to update
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: 'Televisor LG 55 Pulgadas'
 *                price:
 *                  type: number
 *                  example: 249
 *                available:
 *                  type: boolean
 *                  example: true
 *      responses:
 *         200:
 *           description: Product updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/Product'
 *         400:
 *           description: Bad request - Invalid input
 *         404:
 *           description: Product not found
 */

// PUT
router.put(
	"/:id",
	param("id").isInt().withMessage("El id debe ser un numero"),
	body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
	body("price")
		.isNumeric()
		.withMessage("El precio debe ser un numero")
		.custom((value) => value > 0),
	body("available")
		.isBoolean()
		.withMessage("El disponible debe ser un booleano"),
	handleInputErrors,
	updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Updates the availability of a product
 *     tags:
 *       - Products
 *     description: Updates the availability of a product in the database
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product availability updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request - Invalid ID
 */

// PATCH
router.patch(
	"/:id",
	param("id").isInt().withMessage("El id debe ser un numero"),
	handleInputErrors,
	updateAvailability
);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     description: Returns a new record in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'Monitor Curvo de 49 Pulgadas'
 *               price:
 *                 type: number
 *                 example: 299
 *               available:
 *                 type: boolean
 *                 example: true
 *     responses:
 *        201:
 *          description: Product created successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Product'
 *        400:
 *          description: Bad request - Invalid input data
 */

// POST
router.post(
	"/",
	/* Validacion */
	body("name").notEmpty().withMessage("El nombre del producto es obligatorio"),

	body("price")
		.isNumeric()
		.withMessage("El precio debe ser un numero")
		.custom((value) => value > 0),
	handleInputErrors,
	createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Deletes a product in the database
 *     tags:
 *       - Products
 *     description: Returns a confirmation message that the product has been deleted
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The product has been deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               value: "Producto eliminado"
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request - Invalid ID
 */

// DELETE
router.delete(
	"/:id",
	param("id").isInt().withMessage("El id debe ser un numero"),
	handleInputErrors,
	deleteProduct
);

export default router;
