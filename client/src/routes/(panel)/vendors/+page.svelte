<script lang="ts">
	import VendorCard from "@/components/cards/VendorCard.svelte";
	import { Button } from "flowbite-svelte";
	import AddVendorModal from "@/components/modals/AddVendorModal.svelte";
	import { API_BASE } from "@/lib/config/default";
	import type { TGetAllVendor } from "@/lib/types/api_respones/external/get_all_vendor";
	import { onMount } from "svelte";
	import { addToast } from "@/components/shared/Toast.svelte";
	import { get } from "svelte/store";
	import { page } from "$app/stores";

	let add_vendor_modal: AddVendorModal;

	let all_vendors: TGetAllVendor["data"] = [];

	onMount(() => {
		fetch(`${API_BASE}/vendor/get-all`)
			.then((res) => res.json())
			.then((result) => (all_vendors = result.data))
			.catch((e) => addToast(e.message));
	});

	function handle_successful_creation(ev: CustomEvent) {
		all_vendors = [...all_vendors, ev.detail.data];
		add_vendor_modal.hide();
	}
</script>

<AddVendorModal on:success={handle_successful_creation} bind:this={add_vendor_modal} />
<div class="container mx-auto">
	<div class="grid grid-cols-4 gap-x-3 gap-y-2 py-8">
		{#if all_vendors}
			{#each all_vendors as i, idx}
				<VendorCard _id={i._id} name={i.name} on:deleted={(e) => (all_vendors = all_vendors.filter((v) => v._id !== e.detail._id))} />
			{/each}
		{/if}

		{#if $page.data.user}
			<div class="flex items-center justify-center bg-white py-5">
				<Button size="xl" color="light" on:click={add_vendor_modal.show}>Add New</Button>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
</style>
