import { ReactNode } from "react";
import "./globals.css";
import Navbar from "../components/Navbar";
import { CartProvider } from "@/context/cart";
interface RootPageProps {
	children: ReactNode;
}
export default function RootLayout({ children }: RootPageProps) {
	return (
		<html lang="en">
			<body>
				<CartProvider>
					<Navbar />
					{children}
				</CartProvider>
			</body>
		</html>
	);
}
