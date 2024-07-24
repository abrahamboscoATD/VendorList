<script lang="ts">
	import { Button } from "flowbite-svelte";
	import Icon from "@iconify/svelte";
	import { onDestroy } from "svelte";
	import { addToast } from "@/components/shared/Toast.svelte";
	import TableFilterDrawer from "@/components/drawers/TableFilterDrawer/index.svelte";
	import { page } from "$app/stores";
	import { get } from "svelte/store";
	import { browser } from "$app/environment";
	import { usePressEnter } from "@/lib/helpers";
	import { goto } from "$app/navigation";
	import type { IGetAllApplicationListResponse } from "@/lib/types/api_respones/external/get_all_applicaiton_list";
	import exportTableDataToCSV from "@/lib/generator/exportTableDataToCSV";

	let data: IGetAllApplicationListResponse["data"];
	let filter_drawer: TableFilterDrawer;
	const searchParams = get(page).url.searchParams;

	function fetch_table_data(search: string) {
		fetch(`http://localhost:8080/api/application-list/get-all${search}`)
			.then((response) => response.json())
			.then((result: IGetAllApplicationListResponse) => {
				if (!result.success) {
					addToast({ msg: "Failed to fetch data" });
				} else {
					data = result.data;
					console.log(data);
					console.log("re-called data");
				}
			})
			.catch((error) => console.log("error", error));
	}
	const us = page.subscribe((data) => {
		if (!browser) return;
		console.log("search changed");
		fetch_table_data(data.url.search);
	});

	onDestroy(us);

	$: data_to_render = data;

	function handlePressEnter(e: CustomEvent) {
		const value = e.detail;
		if (value) {
			searchParams.set("search", e.detail);
		} else {
			searchParams.delete("search");
		}
		goto("/applications?" + searchParams.toString());
	}
</script>

<TableFilterDrawer bind:this={filter_drawer}></TableFilterDrawer>
<main class="pb-10">
	<div class="mx-auto mt-2 w-11/12">
		<div class="mb-3">
			<div class="mx-auto flex gap-2">
				<div class="relative flex-1">
					<input
						type="text"
						id="email-address-icon"
						value={searchParams.get("search")}
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
						placeholder="Search..."
						use:usePressEnter={null}
						on:pressEnter={handlePressEnter}
					/>

					<button class="absolute inset-y-0 end-0 flex items-center pe-3.5" type="submit">
						<Icon icon="guidance:search" />
					</button>
				</div>
				<button
					class="inline-flex w-2/12 items-center justify-center gap-3 rounded-md border border-zinc-300 bg-zinc-100 px-3 font-medium text-slate-600"
					type="button"
					on:click={() => filter_drawer.show()}
				>
					<Icon icon="fluent:filter-12-filled" /> Filter</button
				>
				{#if data?.result?.length}
					<Button on:click={() => exportTableDataToCSV(data.result)} color="light" type="button">
						<Icon icon="iconoir:cloud-download" class="me-2 text-xl" /> Export
					</Button>
				{/if}
				<Button href="/admin/add-application" color="primary" type="button"
					><Icon icon="lucide:list-plus" class="me-2 text-xl" /> Add New</Button
				>
			</div>
		</div>

		<div class="bg-white">
			<table class="w-full table-auto border-collapse" id="application-list-table" style="">
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Vendor</th>
						<th>Full Name</th>
						<th>Phone</th>
						<th>Email</th>
						<th>Support Level</th>
					</tr>
				</thead>

				<tbody>
					{#if data_to_render && data_to_render.result.length}
						{#each data.result as d, idx}
							<tr>
								<td>{idx + 1}</td>
								<td>{d.application}</td>
								<td>
									{#if d.vendor?.name}
										{d.vendor.name}
									{:else}
										<span class="italic text-red-700/40">deleted</span>
									{/if}
								</td>
								<td>
									{#if d.full_name}
										{d.full_name}
									{/if}
								</td>
								<td>{d.phone}</td>
								<td>{d.email}</td>
								<td>
									{#if d.support_level === "l1"}
										<button class="sp-btn l1">L1 Support</button>
									{:else if d.support_level === "l2"}
										<button class="sp-btn l2">L2 Support</button>
									{:else if d.support_level === "l3"}
										<button class="sp-btn l3">L3 Support</button>
									{/if}
								</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
	</div>
</main>

<style lang="postcss">
	/* #application-list-table{} */

	#application-list-table thead tr th {
		@apply border bg-stone-100 p-3 text-left font-semibold;
	}

	#application-list-table tr td {
		@apply border-b px-4 py-2;
	}
	#application-list-table tr:hover td {
		@apply bg-stone-50;
	}
	.sp-btn {
		@apply rounded-full border px-2 py-0.5 text-sm;
	}
	.sp-btn.l1 {
		@apply bg-red-500/50 text-white;
	}
	.sp-btn.l2 {
		@apply bg-sky-500 text-white;
	}
	.sp-btn.l3 {
		@apply bg-green-500 text-white;
	}
</style>
