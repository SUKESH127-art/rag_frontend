/** @format */

"use client";

import createAPIClient from "@/lib/getAPIClient";
import { getSessionId } from "@/lib/getUserId";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";

export default function SubmitQueryForm() {
	const api = createAPIClient();
	const userId = getSessionId();

	const originalPlaceholder: string =
		"How much does a landing page cost to develop?";

	const [query, setQuery] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const submitForm = () => {
		const queryToSubmit = query || originalPlaceholder;
		console.log(`Submitting query: ${queryToSubmit}`);
		const request = { queryText: queryToSubmit, userId: userId };
		const response = api.submitQueryEndpointSubmitQueryPost({
			submitQueryRequest: request,
		});

		setIsSubmitting(true);
		response.then((data) => {
			console.log(data);
			router.push(`/viewQuery?query_id=${data.queryId}`);
		});
	};

	const textArea = (
		<Textarea
			placeholder={originalPlaceholder}
			value={query}
			disabled={isSubmitting}
			onChange={(e) => {
				setQuery(e.currentTarget.value);
			}}
		/>
	);

	const submitButton = (
		<Button onClick={submitForm} disabled={isSubmitting} className="ml-auto">
			{isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Submit
		</Button>
	);

	return (
		<>
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Submit New Query</CardTitle>
					<CardDescription>
						Ask a question about Galaxy Designs — a web-design agency that
						builds websites for small and medium businesses.
					</CardDescription>
				</CardHeader>
				<CardDescription className="w-full">{textArea}</CardDescription>
				<CardFooter>{submitButton}</CardFooter>
			</Card>
		</>
	);
}
