import { ReactNode } from "react";
interface RootPageProps {
	children: ReactNode;
}
export default function WomenLayout({ children }: RootPageProps) {
	return <>{children}</>;
}
