"use client";

import { useProductsHook } from "@/hooks/useDataHook";
import Link from "next/link";
import Image from "@/components/Image";

import { useCategoriesHook } from "@/hooks/useCategories";
import { Categories } from "@/app/types/Categories";
import Spinner from "@/components/Spinner";

export default function Shirts() {
	const { products, isLoading } = useProductsHook("/api/products");
	const { categories } = useCategoriesHook("/api/categories");
	const findCategory: Categories[] = categories.filter(
		(category) => category.id === 18
	);
	const menProducts = products.filter((product) =>
		product.categories.some((category) =>
			findCategory.some((cat) => cat.slug === category.slug)
		)
	);

	return isLoading ? (
		<Spinner />
	) : (
		<div className="hero min-h-screen bg-base-300 px-4">
			<div className="hero-content flex-col">
				<h1>Shirts</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{menProducts.map((product, index) =>
						product.price ? (
							<div
								key={index}
								className="card flex-shrink-0 w-full shadow-2xl bg-base-100"
							>
								{/* Display only the first image */}
								{product.images.length > 0 && (
									<figure className="px-10 pt-10">
										<Link href={`/product/${product.slug}`}>
											<Image
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
