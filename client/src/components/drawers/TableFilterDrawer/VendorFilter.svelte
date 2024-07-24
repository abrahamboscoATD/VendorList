<script lang="ts">
	import { onMount } from "svelte";
	import type { TGetAllVendor } from "@/lib/types/api_respones/external/get_all_vendor";
	import { getAllVendors } from "@/lib/request/vendor";
	import AutoComplete, { type TAutoCompleteData } from "../../forms/element/AutoComplete.svelte";
	import Icon from "@iconify/svelte";
	import Block from "@/components/shared/Block.svelte";

	export let selected: TAutoCompleteData[] = [];
	let vendors: TGetAllVendor["data"];
	let showable_vendor: TGetAllVendor["data"];
	let show_autocomplete = false;

	onMount(() => getAllVendors().then((data: TGetAllVendor) => (showable_vendor = vendors = data.data)));

	function handle_selected_vendor(_v: any) {
		const is_alrady_exist = selected.find((v) => {
			return v.value === _v.value;
		});

		if (!is_alrady_exist) {
			selected = [...selected, _v];
		}

		show_autocomplete = false;
	}

	function handle_remove(s: TAutoCompleteData) {
		selected = selected.filter((v) => v.value !== s.value);
	}
</script>

<Block style="light">
	<h6 slot="title" class="">
		Select a Vendor
		{#if selected.length}
			<span class="rounded-full bg-primary-400 p-1 px-2 text-xs">{selected.length}</span>
		{/if}
	</h6>
	{#if selected.length}
		<ul class="mb-1 py-2">
			{#each selected as s}
				<li class="mx-1 my-1 inline-flex flex-wrap items-center justify-between bg-gray-200 px-2 py-1">
					<p>{s?.label}</p>
					<button class="ms-2 p-1 hover:bg-black/15" on:click={() => handle_remove(s)}><Icon icon="line-md:close" /></button>
				</li>
			{/each}
		</ul>
	{/if}
	<div class="py-2">
		{#if vendors?.length && show_autocomplete}
			<AutoComplete
				on:select={(e) => handle_selected_vendor(e.detail)}
				name="vendor"
				id="search-vendor-autocomplete"
				data={showable_vendor.map((v) => ({ label: v.name, value: v._id }))}
				placeholder="Select Vendor"
			/>
		{:else}
			<button class="w-full border border-dashed border-slate-400 p-2" on:click={() => (show_autocomplete = true)}>Add Vendor</button>
		{/if}
	</div>
</Block>
