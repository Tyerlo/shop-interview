export interface Products {
	id: number;
	name: string;
	slug: string;
	quantity: number;
	permalink: string;
	categories: [{ id: number; name: string; slug: string }];
	short_description: string;
	sku: string;
	price: string;
	stock_status: string;
	related_ids: [];
	images: [{ src: string; alt: string }];
}
