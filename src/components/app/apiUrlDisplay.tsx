/** @format */

// src/components/ApiUrlDisplay.tsx

"use client"; // <-- This is a Client Component

import getApiUrl from "@/lib/getAPIClient";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";

export default function ApiUrlDisplay() {
	// 1. Start with a placeholder state that is the same on server and client.
	const [url, setUrl] = useState<string | null>(null);

	// 2. useEffect will ONLY run on the client, after the initial render.
	useEffect(() => {
		// 3. Inside here, it's safe to use browser-specific logic.
		const apiClientObject = getApiUrl();
		console.log("API Client Object", apiClientObject);

		const baseUrl =
			apiClientObject["configuration"].basePath || "URL not found";
		setUrl(baseUrl);
	}, []);

	return (
		<div className="bg-slate-300 p-1 rounded-sm text-slate-600 flex">
			<Globe className="my-auto mr-2 h-4 w-4" /> {url}
		</div>
	);
}
