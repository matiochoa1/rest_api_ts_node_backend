import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { Products } from "./pages/Products";
import { NewProduct, action as newProductAction } from "./pages/NewProduct";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Products />,
			},
			{
				path: "/producto-nuevo",
				element: <NewProduct />,
				action: newProductAction,
			},
		],
	},
]);
