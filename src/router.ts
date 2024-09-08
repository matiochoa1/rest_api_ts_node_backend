import { Router } from "express";
import { body } from "express-validator";
import { createProduct, getProducts } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

// Routing
router.get("/", getProducts);

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

export default router;
