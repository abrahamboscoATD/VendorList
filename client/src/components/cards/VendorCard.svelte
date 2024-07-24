<script lang="ts">
	import { API_BASE } from "@/lib/config/default";
	import { Button, Input, Label } from "flowbite-svelte";
	import { createEventDispatcher, onMount } from "svelte";
	import ConfirmationModal from "../modals/ConfirmationModal.svelte";
	import { browser } from "$app/environment";
	import { addToast } from "../shared/Toast.svelte";
	import { page } from "$app/stores";
	export let name: string;
	export let _id: string;
	let id = _id || globalThis.crypto.randomUUID();

	let update_input_value = name;
	let error = "";
	let mode: "update" | "read" = "read";
	let confirmation_modal: ConfirmationModal;
	const dispatch = createEventDispatcher();

	onMount(() => {
		confirmation_modal = new ConfirmationModal({
			target: document.getElementById("modals")!!
		});
	});

	async function handle_update() {
		if (!update_input_value) error = "New value cannot be empty";
		error = "";

		fetch(`${API_BASE}/vendor/update-one/${_id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				name: update_input_value
			})
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				if (!result.success) {
					if (result.data?.name[0]) return (error = result.data.name[0]);
					else error = result.message;
				} else {
					dispatch("update", result.data);
					name = result.data.name;
					mode = "read";
				}
			});
	}

	function handle_delete() {
		confirmation_modal.show(`Are you Sure you want to delete ${name} Vendor ?`).then((result) => {
			if (!result) return;
			fetch(`${API_BASE}/vendor/delete-one/${_id}`, {
				method: "DELETE"
			})
				.then((response) => response.json())
				.then((result) => {
					if (result.success) {
						addToast({ msg: "successfully Deleted" });
						dispatch("deleted", result.data);
						return;
					}
					addToast({ msg: "failed to delete" });
				});
		});
	}

	$: user = $page.data.user;
</script>

<div class=" group rounded border bg-white hover:border-slate-400/70 {mode === 'update' ? '!border-primary-400' : ''}" {id}>
	<div class="px-5 py-3">
		{#if mode === "read"}
			<p class="text-xl">{name}</p>
		{:else if mode === "update"}
			<div>
				<Input bind:value={update_input_value} type="text" placeholder="e.g Google" size="lg" required />
				{#if error}
					<p class="mt-1 text-xs text-red-500">{error}</p>
				{/if}
			</div>
		{/if}
	</div>
	<div class="{mode === 'read' ? 'opacity-15' : ''} group-hover:opacity-100">
		{#if user}
			{#if mode === "read"}
				<div class="p-2 text-end">
					<Button on:click={() => (mode = "update")} size="xs" pill color="blue">Edit</Button>
					<Button size="xs" pill color="red" on:click={handle_delete}>Delete</Button>
				</div>
			{:else if mode === "update"}
				<div class="p-2 text-end">
					<Button size="xs" checked pill color="yellow" on:click={() => (mode = "read")}>Discard</Button>
					<Button size="xs" pill on:click={handle_update} color="green">Save</Button>
				</div>
			{/if}
		{/if}
	</div>
</div>
