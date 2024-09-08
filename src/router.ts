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

// Routing
//GET
router.get("/", getProducts);

router.get(
	"/:id",
	param("id").isInt().withMessage("El id debe ser un numero"),
	handleInputErrors,
	getProductById
);

// PUT
router.put(
	"/:id",
	param("id").isInt().withMessage("El id debe ser un numero"),
	handleInputErrors,
	updateProduct
);

// PATCH
router.patch(
	"/:id",
	param("id").isInt().withMessage("El id debe ser un numero"),
	handleInputErrors,
	updateAvailability
);

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

// DELETE
router.delete(
	"/:id",
	param("id").isInt().withMessage("El id debe ser un numero"),
	handleInputErrors,
	deleteProduct
);

export default router;
