import { ReactNode } from "react";
interface RootPageProps {
	children: ReactNode;
}
export default function ProductLayout({ children }: RootPageProps) {
	return <>{children}</>;
}
