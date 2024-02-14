import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"; // Supports ESM
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const api = new WooCommerceRestApi({
		url: process.env.WOOCOMMERCE_URL,
		consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
		consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
		version: "wc/v3" // WooCommerce WP REST API version
	});

	try {
		const response = await api.get("products");

		res.status(response.status).json(response.data);
	} catch (error) {}
}
