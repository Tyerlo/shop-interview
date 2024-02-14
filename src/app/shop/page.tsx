"use client";
import Image from "@/components/Image";
import Spinner from "@/components/Spinner";

import { useProductsHook } from "@/hooks/useDataHook";
import { useCategoriesHook } from "@/hooks/useCategories";
import Link from "next/link";
import { Categories } from "../types/Categories";

export default function Shop() {
	const { products, isLoading } = useProductsHook("/api/products");
	const { categories } = useCategoriesHook("/api/categories");

	const findCategory: Categories[] = categories.filter(
		(category) => category.id === 16 || category.id === 30 || category.id === 17
	);

	return isLoading ? (
		<Spinner />
	) : (
		<div className="hero min-h-screen bg-base-300 px-4">
			<div className="hero-content flex-col">
				<h1>Shop</h1>
				<div role="tablist" className="tabs">
					{findCategory.map((category, index) => (
						<Link
							key={index}
							href={`/shop/${category.slug}`}
							role="tab"
							className="tab"
						>
							{category.name}
						</Link>
					))}
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{products.map((product, index) =>
						product.price.length > 0 ? (
							<div
								key={index}
								className="card flex-shrink-0 w-full shadow-2xl bg-base-100"
							>
								{product.images.length > 0 && (
									<figure className="px-10 pt-10">
										<Link href={`/product/${product.slug}`}>
											<Image
												priority={true}
												src={product.images[0].src}
												width={300}
												height={300}
												alt={product.images[0].alt}
											/>
										</Link>
									</figure>
								)}
								<div className="card-body items-center text-center">
									<h2 className="card-title">{product.name}</h2>
									<p>${product.price}</p>
								</div>
							</div>
						) : null
					)}
				</div>
			</div>
		</div>
	);
}
