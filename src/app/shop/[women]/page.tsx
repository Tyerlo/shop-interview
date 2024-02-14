"use client";
import { useProductsHook } from "@/hooks/useDataHook";
import Link from "next/link";
import Image from "@/components/Image";
import Spinner from "@/components/Spinner";
import { useCategoriesHook } from "@/hooks/useCategories";
import { Categories } from "@/app/types/Categories";

export default function Women({ params }: { params: { women: string } }) {
	const { products, isLoading } = useProductsHook("/api/products");
	const { categories } = useCategoriesHook("/api/categories");

	const findCategory: Categories[] = categories.filter((category) =>
		category.slug.includes("-women")
	);

	// Filter products based on the findCategory filter
	const womenProducts = products.filter((product) =>
		product.categories.some((category) =>
			findCategory.some((cat) => cat.slug === category.slug)
		)
	);

	return isLoading ? (
		<Spinner />
	) : (
		<div className="hero min-h-screen bg-base-300 px-4">
			<div className="hero-content flex-col">
				<h1 className="text-4xl">Women</h1>

				<div role="tablist" className="tabs">
					{findCategory.map((woman, index) => (
						<Link
							key={index}
							href={`/shop/${params.women}/${woman.slug}`}
							className="tab"
						>
							{woman.name}
						</Link>
					))}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{womenProducts.map((product, index) =>
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
