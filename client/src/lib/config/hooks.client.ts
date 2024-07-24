import type { NavigationEvent } from "@sveltejs/kit";

export const handle = (event: NavigationEvent) => {
	console.log(event);
};
