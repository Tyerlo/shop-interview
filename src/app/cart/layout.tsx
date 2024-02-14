import { ReactNode } from "react";
interface RootPageProps {
	children: ReactNode;
}
export default function CartLayout({ children }: RootPageProps) {
	return <>{children}</>;
}
