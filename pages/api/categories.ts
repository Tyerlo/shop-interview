import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const api = new WooCommerceRestApi({
		url: process.env.WOOCOMMERCE_URL,
		consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
		consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
		version: "wc/v3"
	});

	try {
		// Fetch categories instead of products
		const response = await api.get("products/categories");
		res.status(response.status).json(response.data);
	} catch (error) {
		console.error("Error fetching categories:", error);
		res.status(500).json({ error: "Failed to fetch categories" });
	}
}
