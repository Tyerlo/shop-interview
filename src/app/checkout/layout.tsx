import { ReactNode } from "react";
interface RootPageProps {
	children: ReactNode;
}
export default function CheckOutLayout({ children }: RootPageProps) {
	return <>{children}</>;
}
