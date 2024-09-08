import { Request, Response } from "express";
import Product from "../models/Product.model";

export const createProduct = async (req: Request, res: Response) => {
	// req.body va a leer lo que nosotros mandamos en el body de la peticion
	// const product = new Product(req.body);
	// const savedProduct = await product.save();

	try {
		const product = await Product.create(req.body); // create es una alternativa a new Product(req.body) ya que crea todo en una sola linea

		res.json({
			data: product,
		});
	} catch (error) {
		console.error(error);
	}
};
