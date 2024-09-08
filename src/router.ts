import { Router } from "express";
import { body } from "express-validator";
import { createProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

// Routing
router.get("/", (req, res) => {
	res.json("Desde Get");
});

router.post(
	"/",
	/* Validacion */
	body("name").notEmpty().withMessage("El nombre del producto es obligatorio"),

	body("price")
		.isNumeric()
		.withMessage("El precio debe ser un numero")
		.custom((value) => value > 0)
		.withMessage("El precio debe ser mayor a 0"),
	handleInputErrors,
	createProduct
);

export default router;
