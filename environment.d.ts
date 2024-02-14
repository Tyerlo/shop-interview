declare global {
	namespace NodeJS {
		interface ProcessEnv {
			WOOCOMMERCE_URL: string;
			WOOCOMMERCE_CONSUMER_KEY: string;
			WOOCOMMERCE_CONSUMER_SECRET: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
