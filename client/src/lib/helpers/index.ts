import type { Action } from "svelte/action";

type TParameters = {
	/**
	 * list of those elements, which are would be outside of click area but popup will not be disapeard.
	 */
	exceptions: (HTMLElement | null)[];
};

export const useOutsideClick: Action<HTMLElement, TParameters, { "on:outclick": (e: CustomEvent) => void }> = function (
	node: HTMLElement,
	{ exceptions: exceptions }
) {
	function hasExceptions(event: MouseEvent | PointerEvent, _exceptions: typeof exceptions = []) {
		let _has = false;
		for (const i of _exceptions) {
			if (event.target === i) {
				_has = true;
				break;
			}
		}
		return _has;
	}

	function handleClick(event: MouseEvent | PointerEvent) {
		if (!node.contains(event.target as Node | null) && !hasExceptions(event, exceptions)) {
			node.dispatchEvent(new Event("outclick"));
		}
	}
	document.addEventListener("click", handleClick, true);

	return {
		destroy() {
			document.removeEventListener("click", handleClick, true);
		}
	};
};

/*  -------------------------------------
	| UsePress enter Event Action;      |
	-------------------------------------
*/

export const usePressEnter: Action<HTMLInputElement, null, { "on:pressEnter": (e: CustomEvent) => void }> = (node) => {
	function pressEnterHandler(e: KeyboardEvent) {
		const target = e.currentTarget as HTMLInputElement;
		if (e.code === "Enter") {
			node.dispatchEvent(new CustomEvent("pressEnter", { detail: target.value || null }));
		}
	}

	node.addEventListener("keyup", pressEnterHandler);

	return {
		destroy() {
			node.removeEventListener("keyup", pressEnterHandler);
		}
	};
};
