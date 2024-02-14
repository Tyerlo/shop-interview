"use client";
import { useEffect, useState } from "react";
import { Products } from "../app/types/Products";

export function useProductsHook(url: string) {
	const [products, setProducts] = useState<Products[]>([]);
	const [isLoading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		async function fetchData() {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const productData: Products[] = await response.json();
				const productsWithQuantity: Products[] = productData.map((product) => ({
					...product,
					quantity: 0
				}));

				setProducts(productsWithQuantity);
			} catch (error) {
				console.error("Fetching data failed", error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, [url]);

	return { products, isLoading };
}
