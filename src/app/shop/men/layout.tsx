import { ReactNode } from "react";
interface RootPageProps {
	children: ReactNode;
}
export default function MenLayout({ children }: RootPageProps) {
	return <>{children}</>;
}
