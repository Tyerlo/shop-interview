/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	trailingSlash: true,
	swcMinify: true,
	images: {
		loader: "custom",
		unoptimized: true
	}
};

module.exports = nextConfig;
