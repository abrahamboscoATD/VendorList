<script lang="ts" context="module">
	export type TAutoCompleteData = {
		label: string;
		value: string;
	};
</script>

<script lang="ts">
	import { createEventDispatcher, onMount, tick } from "svelte";
	import { useOutsideClick } from "$lib/helpers/index";
	import type { HTMLInputAttributes } from "svelte/elements";

	export let data: TAutoCompleteData[] = [];
	export let placeholder = "Select One Option";
	export let id: string = globalThis.crypto.randomUUID();
	export let selected: TAutoCompleteData | undefined = undefined;
	export let name = "";
	export let search_by: keyof TAutoCompleteData = "label";

	let dropdownEl: HTMLDivElement;
	let is_item_show = false;
	const dispatch = createEventDispatcher();

	$: data_to_render = data;
	$: if (is_item_show) {
		tick().then(() => {
			const search_input = dropdownEl.querySelector<HTMLInputElement>("#dropdown-search-input");
			if (!search_input) return;
			search_input.focus();
		});
	}

	function handle_selecting(_selected: TAutoCompleteData) {
		is_item_show = false;
		selected = _selected;
		data_to_render = data; //Reseting filter data after selected;
		dispatch("select", _selected);
	}

	function handle_clear() {
		selected = undefined;
		data_to_render = data; //Reseting filter data after selected;
		dispatch("clear");
	}

	const handleSearching: HTMLInputAttributes["on:change"] = (event) => {
		const search_text = event.currentTarget.value.trim().toLowerCase();

		data_to_render = data.filter((d) => {
			const normalizedD = d[search_by].trim().toLowerCase();
			// console.log(normalizedD, " === ", search_text, normalizedD === search_text);

			if (normalizedD === search_text) {
				return true;
			} else if (normalizedD.startsWith(search_text)) {
				return true;
			} else if (normalizedD.includes(search_text)) {
				return true;
			} else {
				false;
			}
		});
	};

	export function reset() {
		handle_clear();
	}
</script>

<div {id} bind:this={dropdownEl} class="dropdown group relative">
	<input type="hidden" value={selected?.value || ""} {name} on:change={() => console.log("input value changed")} />
	{#if is_item_show}
		<input
			class="search-input w-full rounded-md border px-4 py-2 text-left focus:outline-primary-300"
			id="dropdown-search-input"
			placeholder="Search"
			on:input={handleSearching}
			on:click={() => (is_item_show = true)}
		/>
	{:else if selected !== undefined}
		<div class="placeholder-wrapper flex rounded-md border focus-within:border-primary-400" tabindex="-1">
			<button class=" placeholder-btn flex-1 rounded-md px-4 py-2 text-left text-[0.9em]" on:click={() => (is_item_show = true)}
				>{selected.label}</button
			>
			<button class="clear-btn bg-black/10 px-3 hover:bg-black/5" on:click={handle_clear}>
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M19 15.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12zM22 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7c-.69 0-1.23-.36-1.59-.89L0 12l5.41-8.12C5.77 3.35 6.31 3 7 3zm0 2H7l-4.72 7L7 19h15z"
					/>
				</svg>
			</button>
		</div>
	{:else}
		<button class="w-full rounded-md border px-4 py-2 text-left text-sm" on:click={() => (is_item_show = true)}>{@html placeholder}</button>
	{/if}

	<!-- AutoCompleted List -->
	{#if is_item_show}
		<div
			class="autocomplete-content absolute top-[105%] max-h-[250px] w-full overflow-auto rounded-lg border bg-white shadow-lg"
			use:useOutsideClick={{ exceptions: [dropdownEl.querySelector("#dropdown-search-input")] }}
			on:outclick={() => (is_item_show = false)}
		>
			<ul class="autocomplete-ul">
				{#each data_to_render as d}
					<li class="autocomplete-li">
						<button
							tabindex="0"
							on:click={() => handle_selecting(d)}
							class="autocomplete-element-btn w-full cursor-pointer border-b px-4 py-1 text-left text-[1em] hover:bg-primary-500 hover:text-white focus:bg-primary-500 focus:text-white"
							class:bg-primary-200={selected?.value === d.value}
						>
							{@html d.label}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style lang="postcss">
</style>
