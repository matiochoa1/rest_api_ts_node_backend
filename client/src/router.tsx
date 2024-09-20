import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { Products, loader as productsLoader } from "./pages/Products";
import { NewProduct, action as newProductAction } from "./pages/NewProduct";
import { EditProduct } from "./pages/EditProduct";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Products />,
				loader: productsLoader,
			},
			{
				path: "/producto-nuevo",
				element: <NewProduct />,
				action: newProductAction,
			},
			{
				path: "/productos/:id/editar",
				element: <EditProduct />,
			},
		],
	},
]);
