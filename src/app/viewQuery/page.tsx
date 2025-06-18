/** @format */

"use client";

import { QueryModel } from "@/api-client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import createAPIClient from "@/lib/getAPIClient";
import { ArrowLeft, Link2, Loader } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewQueryPage() {
	const searchParams = useSearchParams(); // a hook that provides access to the URL search parameters
	const queryId = searchParams.get("queryId"); // get the queryId from the URL
	const api = createAPIClient(); // create an API client instance
	// refreshes the component when the state changes
	const [queryItem, setQueryItem] = useState<QueryModel>(); // set up useState hook to store the query item

	// useEffect hook to actually call the API once
	useEffect(() => {
		const fetchData = async () => {
			try {
				// create a request object with the queryId
				const request = { queryId: queryId! };
				const response = api.getQueryEndpointGetQueryGet(request); // call the API to fetch the query
				response.then((data) => {
					console.log(data);
					setQueryItem(data);
				});
				console.log(`Got data: ${response}`);
			} catch (error) {
				console.error("Error fetching query:", error);
			}
		};
		fetchData();
	});

	let viewQueryElement;

	if (!queryItem) {
		viewQueryElement = (
			<div>
				<div className="space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-full" />
				</div>
			</div>
		);
	} else {
		// source components are reference points for each of the answers we have
		if (!queryItem.sources) {
			queryItem.sources = [];
		}
		const sourcesElement = queryItem.sources!.map((source) => {
			return (
				<Link key={source} href={`/source/${source}`}>
					<div className="text-xs flex text-slate-500 hover:underline">
						<Link2 className="mr-2 h-4 w-4" />
						{source}
					</div>
				</Link>
			);
		});

		const isComplete = queryItem.isComplete;
		const answerElement = isComplete ? (
			<>
				<div className="font-bold">Response</div>
				{queryItem?.answerText}
				<div className="mt-4">{sourcesElement}</div>
			</>
		) : (
			<>
				<div className="text-slate-500 flex">
					<Loader className="h-4 w-4 mr-2 my-auto" />
					Still loading. Try again!
				</div>
			</>
		);

		//queryItem.answerText || "Query still in progress. Please wait...";

		viewQueryElement = (
			<>
				<div className="bg-blue-100 text-blue-800 p-3 rounded-sm">
					<div className="font-bold">Question</div>
					{queryItem?.queryText}
				</div>
				<div className="bg-slate-100 text-slate-700  p-3 rounded-sm">
					{answerElement}
				</div>
			</>
		);
	}

	return (
		<>
			<Card className="w-full">
				<CardHeader>
					<CardTitle>View Query</CardTitle>
					<CardDescription>Query ID: {queryId}</CardDescription>
				</CardHeader>

				<CardContent className="flex flex-col gap-2">
					{viewQueryElement}
				</CardContent>

				<CardFooter className="flex justify-between">
					<Link href="/">
						<Button variant="outline">
							{" "}
							<ArrowLeft className="mr-4 h-4 w-4" />
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</>
	);
}
