// components/Image.js
"use client";
import NextImage from "next/image";

// Define types for the loader function and the Image component props
type CustomLoaderProps = {
	src: string;
};

type ImageProps = React.ComponentProps<typeof NextImage> & {
	customLoader?: (props: CustomLoaderProps) => string;
};

// opt-out of image optimization, no-op
const defaultLoader = ({ src }: CustomLoaderProps) => src;

export default function Image({
	loader = defaultLoader,
	...props
}: ImageProps) {
	return <NextImage {...props} loader={loader} />;
}
