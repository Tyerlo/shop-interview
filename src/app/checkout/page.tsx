"use client";

import { CartContext } from "@/context/cart";
import Link from "next/link";
import { useContext } from "react";

export default function Checkout() {
	const { cartItems } = useContext(CartContext);
	// Function to calculate total price
	const calculateTotal = () => {
		let total = 0;
		cartItems.forEach((cart) => {
			total += parseFloat(cart.price);
		});
		return total;
	};
	return (
		<>
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-4xl font-bold py-6 px-6">Checkout</h1>
				<div className="grid grid-cols-2 gap-6">
					<div className="col-span-12">
						<label className="form-control">
							<div className="label">
								<span className="label-text">Email</span>
							</div>
							<input
								type="email"
								placeholder="email@example.com"
								className="input input-bordered"
							/>
						</label>
					</div>

					<div className="col-span-6">
						<label className="form-control">
							<div className="label">
								<span className="label-text">First name</span>
							</div>
							<input
								type="text"
								placeholder="John"
								className="input input-bordered"
							/>
						</label>
					</div>

					<div className="col-span-6">
						<label className="form-control">
							<div className="label">
								<span className="label-text">Last name</span>
							</div>
							<input
								type="text"
								placeholder="Doe"
								className="input input-bordered"
							/>
						</label>
					</div>
				</div>
				<div className="overflow-x-auto mt-5">
					<table className="table">
						{/* head */}
						<thead>
							<tr>
								<th className="text-xl">Product</th>

								<th className="text-xl">Total</th>
							</tr>
						</thead>

						<tbody>
							{/* row 1 */}
							{cartItems.map((cart, index) => (
								<tr key={index}>
									<th>
										{cart.name} x{cart.quantity}
									</th>

									<td>{cart.price}</td>
								</tr>
							))}
							<tr>
								<th>Total</th>
								<td>{calculateTotal()}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<button
					type="submit"
					className="uppercase btn bg-black text-white mt-5"
				>
					Confirm purchase
				</button>
			</div>
		</>
	);
}
