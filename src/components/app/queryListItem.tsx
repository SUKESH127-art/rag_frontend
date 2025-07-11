/** @format */

"use client";

import { QueryModel } from "@/api-client";
import { Link } from "lucide-react";

export default function QueryListItem(props: QueryModel) {
	const shortId = props.queryId?.substring(0, 12);
	return (
		<Link href={`/viewQuery?query_id=$props.queryId`}>
			<div className="text-slate-700 p-1 px-2 rounded-sm flex justify-between hover:bg-slate-100">
				<div>{props.queryId}</div>
				<div className="text-blue/500">{shortId}</div>
			</div>
		</Link>
	);
	return <></>;
}
