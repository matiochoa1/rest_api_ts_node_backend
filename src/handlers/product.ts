import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
	try {
		const products = await Product.findAll({
			attributes: { exclude: ["createdAt", "updatedAt"] },
		});
		res.json({
			data: products,
		});
	} catch (error) {
		console.error(error);
	}
};

export const getProductById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const product = await Product.findByPk(id, {
			attributes: { exclude: ["createdAt", "updatedAt"] },
		});

		if (!product) {
			return res.status(404).json({
				message: "Producto no encontrado",
			});
		}

		res.json({
			data: product,
		});
	} catch (error) {
		console.error(error);
	}
};

export const updateProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const product = await Product.findByPk(id, {
			attributes: { exclude: ["createdAt", "updatedAt"] },
		});

		if (!product) {
			return res.status(404).json({
				message: "Producto no encontrado",
			});
		}

		// update
		await product.update(req.body);
		await product.save();

		res.json({
			data: product,
		});
	} catch (error) {
		console.log(error);
	}
};

export const updateAvailability = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const product = await Product.findByPk(id, {
			attributes: { exclude: ["createdAt", "updatedAt"] },
		});

		if (!product) {
			return res.status(404).json({
				message: "Producto no encontrado",
			});
		}

		// Actualizar la disponibilidad
		product.available = !product.dataValues.available;
		await product.save();
		res.json({
			data: product,
		});
	} catch (error) {
		console.log(error);
	}
};

export const createProduct = async (req: Request, res: Response) => {
	// req.body va a leer lo que nosotros mandamos en el body de la peticion
	// const product = new Product(req.body);
	// const savedProduct = await product.save();

	try {
		const product = await Product.create(req.body); // create es una alternativa a new Product(req.body) ya que crea todo en una sola linea

		res.status(201).json({
			data: product,
		});
	} catch (error) {
		console.error(error);
	}
};

export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const product = await Product.findByPk(id, {
			attributes: { exclude: ["createdAt", "updatedAt"] },
		});

		if (!product) {
			return res.status(404).json({
				message: "Producto no encontrado",
			});
		}

		await product.destroy();

		res.json({
			data: "Producto eliminado",
		});
	} catch (error) {
		console.error(error);
	}
};
