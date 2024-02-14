"use client";
import Image from "@/components/Image";
import { CartContext } from "@/context/cart";
import Link from "next/link";
import React, { useContext } from "react";

export default function Cart() {
	const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
		useContext(CartContext);

	return (
		<>
			<h1 className="text-4xl font-bold py-6 px-6">Cart</h1>
			<div className="overflow-x-auto py-6 px-6">
				<table className="table sm:table-xs">
					{/* head */}
					<thead>
						<tr>
							<th>Product</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{cartItems.map((cart, idx) => (
							<tr key={idx}>
								<td>
									<div className="flex items-center gap-3">
										<div className="avatar">
											<div className="mask mask-squircle w-14 h-14">
												{cart.images.map((image, index) => (
													<Image
														key={index}
														src={image.src}
														alt={image.alt}
														width={100}
														height={100}
													/>
												))}
											</div>
										</div>
										{cart.name}
									</div>
								</td>

								<td>${cart.price}</td>

								<th className="join">
									<button
										className="btn bg-white join-item btn-xs"
										onClick={() => decreaseQuantity(cart)}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-dash-lg"
											viewBox="0 0 16 16"
										>
											<path
												fillRule="evenodd"
												d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"
											/>
										</svg>
									</button>
									<span className="btn bg-white join-item btn-xs">
										{cart.quantity}
									</span>
									<button
										className="btn bg-white join-item btn-xs"
										onClick={() => increaseQuantity(cart)}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-plus-lg"
											viewBox="0 0 16 16"
										>
											<path
												fillRule="evenodd"
												d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
											/>
										</svg>
									</button>
								</th>

								<td>${cart.quantity * parseFloat(cart.price)}</td>
								<td>
									<button onClick={() => removeFromCart(cart.id)}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-x-lg"
											viewBox="0 0 16 16"
										>
											<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
										</svg>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{cartItems.length > 0 ? (
				<Link
					href="/checkout"
					className="uppercase btn bg-black text-white float-end "
				>
					Procced to checkout
				</Link>
			) : (
				<button
					disabled
					className="btn bg-black text-white float-end disabled "
				>
					Procced to checkout
				</button>
			)}
		</>
	);
}
