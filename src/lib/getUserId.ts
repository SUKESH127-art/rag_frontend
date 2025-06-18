/** @format */

import { v4 as uuidv4 } from "uuid";

export function getSessionId() {
	// check if the code is running in a browser environment
	if (typeof window == "undefined") {
		return "nobody";
	}

	// Check if the session ID is stored in session localStorage
	let sessionId = sessionStorage.getItem("sessionId");

	// If not found, generate a new session ID and store it in session localStorage
	if (!sessionId) {
		sessionId = uuidv4(); // Generate a new UUID
		sessionStorage.setItem("sessionId", sessionId);
	}
	return sessionId;
}
