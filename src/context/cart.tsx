"use client";
import { Products } from "@/app/types/Products";
import React, { ReactNode, createContext, useEffect, useState } from "react";

interface CartProviderProps {
	children: ReactNode;
}

interface CartContextType {
	cartItems: Products[];
	addToCart: (item: Products) => void;
	removeFromCart: (productId: number) => void;
	showMessage: boolean;
	quantity: number;
	increaseQuantity: (item: Products) => void;
	decreaseQuantity: (item: Products) => void;
}

export const CartContext = createContext<CartContextType>({
	cartItems: [],
	addToCart: () => {},
	removeFromCart: () => {},
	showMessage: false,
	quantity: 0,
	increaseQuantity: () => {},
	decreaseQuantity: () => {}
});

export const CartProvider = ({ children }: CartProviderProps) => {
	const [cartItems, setCartItems] = useState<Products[]>(() => {
		if (typeof window !== "undefined") {
			const storedCartItems = window.localStorage.getItem("cartItems");
			return storedCartItems ? JSON.parse(storedCartItems) : [];
		}
		return [];
	});

	const [quantity, setQuantity] = useState<number>(0);
	const [showMessage, setShowMessage] = useState(false); // State for showing message

	const addToCart = (item: Products) => {
		const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

		if (isItemInCart) {
			setCartItems(
				cartItems.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				)
			);
		} else {
			// Set showMessage to true
			setShowMessage(true);
			setCartItems([...cartItems, { ...item, quantity: quantity }]);

			// Reset showMessage to false after 3 seconds
			setTimeout(() => {
				setShowMessage(false);
			}, 3000);
		}
	};

	const removeFromCart = (productId: number) => {
		const updatedCartItems = cartItems.filter(
			(cartItem) => cartItem.id !== productId
		); // Remove item from cart
		setCartItems(updatedCartItems);
		setQuantity((prevTotal) => prevTotal - 1);
	};

	const increaseQuantity = (item: Products) => {
		setCartItems(
			cartItems.map((cartItem) =>
				cartItem.id === item.id
					? { ...cartItem, quantity: cartItem.quantity + 1 }
					: cartItem
			)
		);
		setQuantity(quantity + 1);
	};

	const decreaseQuantity = (item: Products) => {
		if (item.quantity > 0 || quantity > 0) {
			setCartItems(
				cartItems.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity - 1 }
						: cartItem
				)
			);
			setQuantity(quantity - 1);
		}
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
		}
	}, [cartItems]);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedCartItems = window.localStorage.getItem("cartItems");
			if (storedCartItems) {
				setCartItems(JSON.parse(storedCartItems));
			}
		}
	}, []);

	return (
		<CartContext.Provider
			value={{
				cartItems,
				quantity,
				showMessage,
				addToCart,
				removeFromCart,
				increaseQuantity,
				decreaseQuantity
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
