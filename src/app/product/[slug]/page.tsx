"use client";

import { CartContext } from "@/context/cart";
import Image from "@/components/Image";
import Spinner from "@/components/Spinner";
import { useProductsHook } from "@/hooks/useDataHook";
import Link from "next/link";
import { useContext } from "react";

export default function Product({ params }: { params: { slug: string } }) {
	const { products, isLoading } = useProductsHook("/api/products");

	const {
		addToCart,
		increaseQuantity,
		decreaseQuantity,
		quantity,
		showMessage
	} = useContext(CartContext);

	const product = products.find((product) => product.slug === params.slug);

	const relatedProducts = product
		? product.categories[0].id === 30 ||
		  product.categories[0].slug.includes("-women")
			? products
					.filter((relatedProduct) =>
						relatedProduct.categories.some((category) => category.id === 30)
					)
					.map((relatedProduct) => ({
						slug: relatedProduct.slug,
						images: relatedProduct.images.map((image) => ({
							src: image.src,
							alt: image.alt
						}))
					}))
			: products
					.filter((relatedProduct) =>
						relatedProduct.categories.some((category) => category.id === 19)
					)
					.map((relatedProduct) => ({
						slug: relatedProduct.slug,
						images: relatedProduct.images.map((image) => ({
							src: image.src,
							alt: image.alt
						}))
					}))
		: [];

	return isLoading ? (
		<Spinner />
	) : (
		<>
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content flex-col lg:flex-row">
					{product?.images[0] ? (
						<figure className="px-10 pt-10">
							<Image
								priority={true}
								src={product?.images[0].src}
								width={1000}
								height={1000}
								alt={product?.images[0].alt}
							/>
						</figure>
					) : null}

					<div>
						<div className="text-lg breadcrumbs">
							<ul>
								{product && (
									<>
										<li>
											<Link href="/shop">Shop</Link>
										</li>
										{(product && product.categories[0].id === 30) ||
										product.categories[0].slug.includes("-women") ? (
											<>
												<li>
													<Link href="/shop/women">Women</Link>
												</li>
												<li>
													<Link
														href={`/shop/women/${product.categories[0].slug}`}
													>
														{product.categories[0].name}
													</Link>
												</li>
											</>
										) : (
											<>
												<li>
													<Link href="/shop/men">Men</Link>
												</li>
												<li>
													<Link
														href={`/shop/men/${product.categories[0].slug}`}
													>
														{product.categories[0].name}
													</Link>
												</li>
											</>
										)}
									</>
								)}
							</ul>
						</div>
						<h1 className="text-5xl font-bold">{product?.name}</h1>
						<p className="py-6"> ${product?.price}</p>
						<p className="py-6">
							{product?.short_description.replace(/<p>(.*?)<\/p>/gs, "$1")}
						</p>
						<div className="join join-vertical lg:join-horizontal">
							<button
								className="btn bg-white join-item"
								onClick={() => product && decreaseQuantity(product)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fillRule="inherit"
									className="bi bi-dash-lg"
									viewBox="0 0 16 16"
								>
									<path
										fillRule="evenodd"
										d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"
									/>
								</svg>
							</button>
							<button className="btn bg-white join-item">{quantity}</button>
							<button
								className="btn bg-white join-item"
								onClick={() => product && increaseQuantity(product)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fillRule="inherit"
									className="bi bi-plus-lg"
									viewBox="0 0 16 16"
								>
									<path
										fillRule="evenodd"
										d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
									/>
								</svg>
							</button>
							<button
								disabled={product && quantity < 1}
								onClick={() => product && addToCart(product)}
								className="uppercase btn bg-black text-white"
							>
								Add to cart
							</button>
						</div>
						{showMessage && (
							<div role="alert" className="alert alert-success mt-5">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="stroke-current shrink-0 h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>Your item has been added to cart!</span>
							</div>
						)}
					</div>
				</div>
			</div>

			<h2 className="text-5xl font-bold">Related products</h2>
			<div className="card flex-col lg:flex-row  shadow-xl gap-4">
				{relatedProducts.map((relatedProduct, idx) =>
					relatedProduct.images.map((img, index) => (
						<Link key={index} href={`/product/${relatedProduct.slug}`}>
							<Image
								key={index}
								width={500}
								height={500}
								src={img.src}
								alt={img.alt}
								className="w-40 h-40 object-cover"
							/>
						</Link>
					))
				)}
			</div>
		</>
	);
}
