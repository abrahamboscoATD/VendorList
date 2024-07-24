import type { Action } from "svelte/action";

export const usePressEnter: Action<HTMLInputElement, null, { "on:pressEnter": (e: CustomEvent) => void }> = (node) => {
	function pressEnterHandler(e: KeyboardEvent) {
		console.log(e.code);
	}

	node.addEventListener("keyup", pressEnterHandler);

	return {
		destroy() {
			node.removeEventListener("keyup", pressEnterHandler);
		}
	};
};
