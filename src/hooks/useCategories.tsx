"use client";
import { useEffect, useState } from "react";

import { Categories } from "@/app/types/Categories";

export function useCategoriesHook(url: string) {
	const [categories, setCategories] = useState<Categories[]>([]);

	const [isLoading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		async function fetchData() {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const categoryData: Categories[] = await response.json();

				setCategories(categoryData);
			} catch (error) {
				console.error("Fetching data failed", error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, [url]);

	return { categories, isLoading };
}
