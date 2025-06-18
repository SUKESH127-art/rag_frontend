/** @format */

"use client";

import { QueryModel } from "@/api-client";
import createAPIClient from "@/lib/getAPIClient";
import { getSessionId } from "@/lib/getUserId";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import QueryListItem from "./queryListItem";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

export default function QueryList() {
	const api = createAPIClient();
	const userId = getSessionId();

	const [isLoading, setIsLoading] = useState(true);
	const [queryItems, setQueryItems] = useState<QueryModel[]>([]);

	// create hook for api call
	useEffect(() => {
		const fetchData = async () => {
			try {
				const request = {
					userId: userId,
				};
				const response = api.listQueryEndpointListQueryGet(request);
				response.then((data) => {
					if (data) {
						console.log(data);
						setQueryItems(data);
						setIsLoading(false);
					}
				});
				console.log(`Got data: ${response}`);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	});

	let queryElements;
	if (isLoading) {
		queryElements = (
			<div className="space-y-2">
				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-full" />
			</div>
		);
	} else {
		queryElements = queryItems.map((queryItem) => {
			return <QueryListItem key={queryItem.queryId} {...queryItem} />;
		});
	}

	return (
		<>
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Recent Queries</CardTitle>
					<CardDescription>
						Here are recently submitted queries!
					</CardDescription>
				</CardHeader>
				<CardContent>{queryElements}</CardContent>
			</Card>
		</>
	);
}
