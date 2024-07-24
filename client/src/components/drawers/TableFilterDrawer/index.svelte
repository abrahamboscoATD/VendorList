<script context="module" lang="ts">
	const table_filter_store = persisted<{ vendor: TAutoCompleteData[]; support_level: ("l1" | "l2" | "l3")[] }>(
		"TABLE_FILTER_STORE",
		{
			vendor: [],
			support_level: []
		},
		{
			storage: "session"
		}
	);
</script>

<script lang="ts">
	import Drawer from "../Drawer.svelte";
	import VendorFilter from "./VendorFilter.svelte";
	import SupportLevelFilter from "./SupportLevelFilter.svelte";
	import { persisted } from "svelte-persisted-store";
	import type { TAutoCompleteData } from "@/components/forms/element/AutoComplete.svelte";
	import { goto } from "$app/navigation";
	import { get } from "svelte/store";
	import { page } from "$app/stores";

	let drawer: Drawer;
	const searchParams = get(page).url.searchParams;

	export const show = (z_index = 500) => drawer.show(z_index);
	export const hide = () => drawer.hide();

	// onMount(() => show());

	function handle_apply_filter() {
		searchParams.set(
			"filter",
			encodeURIComponent(
				JSON.stringify({ vendor: get(table_filter_store).vendor.map((v) => v.value), support_level: get(table_filter_store).support_level })
			)
		);

		goto(`/applications?` + searchParams.toString());
		hide();
	}

	function handle_reset() {
		searchParams.delete("filter");
		goto(`/applications?${searchParams.toString()}`);
		table_filter_store.set({
			vendor: [],
			support_level: []
		});
	}
</script>

<Drawer title="Filter Table Data" bind:this={drawer}>
	<div class="w-[450px] p-3">
		<VendorFilter bind:selected={$table_filter_store.vendor} />
		<SupportLevelFilter bind:selected={$table_filter_store.support_level} />

		<div class="mt-4 grid grid-cols-2 gap-2 text-center">
			<button class="rounded border bg-slate-200 px-4 py-2 text-slate-950 hover:bg-slate-300" on:click={handle_reset}>Reset Filter</button>
			<button class="rounded border bg-primary-500 px-4 py-2 text-white hover:bg-primary-600" on:click={handle_apply_filter}
				>Apply Filter</button
			>
		</div>
	</div>
</Drawer>
