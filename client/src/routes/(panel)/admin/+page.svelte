<script lang="ts">
	import { page } from "$app/stores";
	import AddApplicationForm from "@/components/forms/AddApplicationForm.svelte";
	import Block from "@/components/shared/Block.svelte";
	import { addToast } from "@/components/shared/Toast.svelte";
	import { cFetch } from "@/lib/helpers/fetch";
	import { onMount } from "svelte";

	let dashboard_stat: any | null | undefined = null;
	$: user = $page.data.user;

	onMount(() => {
		cFetch
			.get("/dashboard/stats")
			.then((res) => res.json())
			.then((result) => {
				if (result.error) {
					dashboard_stat = undefined;
					return addToast({ msg: "Failed to load dashboard stats" });
				} else dashboard_stat = result?.data || {};
			});
	});
</script>

<svelte:head>
	<title>Vlink Dashboard</title>
</svelte:head>
<div class="container mx-auto pt-10">
	{#if dashboard_stat}
		<div class="flex justify-center gap-8">
			<div class="min-w-[500px] shrink-0">
				<Block>
					<h3 slot="title" class="text-lg font-medium">Total Available Vendors</h3>

					<div class="text-center">
						<h4 class="text-xl">Total Vendors</h4>
						<p class="my-3 text-3xl font-bold">{dashboard_stat.total_vendors}</p>
						{#if user}
							<a href="/vendors" class="rounded bg-primary-600 px-4 py-1 text-sm text-white">Manage Vendors</a>
						{/if}
					</div>
				</Block>
			</div>
			<div class="min-w-[500px] shrink-0">
				<Block>
					<h3 slot="title" class="text-lg font-medium">Total Available Applications</h3>
					<div class="text-center">
						<h4 class="text-xl">Total Applications</h4>
						<p class="my-3 text-3xl font-bold">{dashboard_stat.total_applications}</p>
						{#if user}
							<a href="/applications?page=1&limit=30" class="rounded bg-primary-600 px-4 py-1 text-sm text-white">See All</a>
							<a href="/admin/add-application" class="rounded bg-primary-600 px-4 py-1 text-sm text-white">Add Application</a>
						{/if}
					</div>
				</Block>
			</div>
		</div>
	{:else if dashboard_stat === null}
		<p class="rounded-md bg-white p-3 text-center">Loading ...</p>
	{:else}
		<p class="rounded-md p-3 text-white">Loading ...</p>
	{/if}
</div>

<style lang="postcss">
</style>
