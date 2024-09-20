import { useNavigate } from "react-router-dom";
import { Product } from "../types";

type ProductDetailProps = {
	product: Product;
};

export default function ProductDetails({ product }: ProductDetailProps) {
	const isAvailable = product.available;

	const navigate = useNavigate();

	return (
		<>
			<tr className="border-b ">
				<td className="p-3 text-lg text-gray-800">{product.name}</td>
				<td className="p-3 text-lg text-gray-800">{product.price}</td>
				<td className="p-3 text-lg text-gray-800">
					{isAvailable ? "Disponible" : "No Disponible"}
				</td>
				<td className="p-3 text-lg text-gray-800 ">
					<div className="flex items-center gap-2">
						<button
							onClick={() => navigate(`/productos/${product.id}/editar`)}
							className="w-full p-2 text-xs font-bold text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-500">
							Editar
						</button>
					</div>
				</td>
			</tr>
		</>
	);
}
