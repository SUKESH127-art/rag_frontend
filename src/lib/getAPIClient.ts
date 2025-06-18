/** @format */

"use client";

import { Configuration, DefaultApi } from "@/api-client";

export function getAPIUrl(): string {
	const url = "https://api.rag.pixegami.io";
	return process.env.NEXT_PUBLIC_API_URL || url;
}

export default function createAPIClient() {
	const apiConfig = new Configuration({
		basePath: getAPIUrl(),
	});
	const api = new DefaultApi(apiConfig);
	return api;
}
