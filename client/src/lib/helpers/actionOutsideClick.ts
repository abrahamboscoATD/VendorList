import type { Action } from "svelte/action";

type ActionOutsideClick = {
	useCapture?: boolean;
	callback: () => Promise<unknown> | unknown;
};

const outsideClickAction: Action<HTMLDivElement, ActionOutsideClick> = function (node: HTMLDivElement, { callback, useCapture = false }) {
	function handleClick(e: MouseEvent) {
		if (e.target instanceof Element && !node.contains(e.target)) {
			// eslint-disable-next-line no-debugger
			Promise.resolve(callback?.()).catch((e) => console.error(e));
		}
	}
	window.addEventListener("click", handleClick, useCapture);

	return {
		update(newCallbackFn) {
			if (typeof newCallbackFn === "function") {
				callback = newCallbackFn;
			}
		},
		destroy() {
			window.removeEventListener("click", handleClick, useCapture);
		}
	};
};

export default outsideClickAction;
