import {
	Link,
	Form,
	useActionData,
	ActionFunctionArgs,
	redirect,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";

export async function action({ request }: ActionFunctionArgs) {
	const data = Object.fromEntries(await request.formData());
	let error = "";

	if (Object.values(data).includes("")) {
		error = "Todos los campos son obligatorios";
	}

	if (error.length) {
		return error;
	}

	await addProduct(data);

	return redirect("/");
}

export const EditProduct = () => {
	const error = useActionData() as string;

	return (
		<>
			<div className="flex justify-between">
				<h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
				<Link
					to={"/"}
					className="p-3 text-sm font-bold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500">
					Volver a Productos
				</Link>
			</div>

			{error && <ErrorMessage>{error}</ErrorMessage>}

			<Form className="mt-10" method="POST">
				<div className="mb-4">
					<label className="text-gray-800" htmlFor="name">
						Nombre Producto:
					</label>
					<input
						id="name"
						type="text"
						className="block w-full p-3 mt-2 bg-gray-50"
						placeholder="Nombre del Producto"
						name="name"
					/>
				</div>
				<div className="mb-4">
					<label className="text-gray-800" htmlFor="price">
						Precio:
					</label>
					<input
						id="price"
						type="number"
						className="block w-full p-3 mt-2 bg-gray-50"
						placeholder="Precio Producto. ej. 200, 300"
						name="price"
					/>
				</div>
				<input
					type="submit"
					className="w-full p-2 mt-5 text-lg font-bold text-white bg-indigo-600 rounded cursor-pointer"
					value="Registrar Producto"
				/>
			</Form>
		</>
	);
};
