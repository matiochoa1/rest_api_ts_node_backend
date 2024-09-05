import { Router } from "express";
import { createProduct } from "./handlers/product";

const router = Router();

// Routing
router.get("/", (req, res) => {
	res.json("Desde Get");
});

router.post("/", createProduct);

export default router;
