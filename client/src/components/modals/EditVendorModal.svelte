<script lang="ts">
	import { Button, Input, Label } from "flowbite-svelte";
	import Modal from "./Modal.svelte";
	import { addToast } from "@/components/shared/Toast.svelte";
	import { createEventDispatcher } from "svelte";
	import { API_BASE } from "@/lib/config/default";

	let values = {
		vendor: ""
	};

	let modal: Modal;
	let errors: any = {};

	const eventDispatch = createEventDispatcher();

	function handle_save() {
		if (!values.vendor) return ((errors as any).vendor = "Vendor is Required");
		//validation success;
		errors = {};

		fetch(`${API_BASE}/vendor/create-one`, {
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				name: values.vendor
			}),
			method: "POST"
		})
			.then((res) => res.json())
			.then((result) => {
				if (result.success) {
					addToast({ msg: "Created Successfully" }, 2000);
					eventDispatch("success", result);
					values = { vendor: "" };
				} else {
					eventDispatch("failed", result);
					errors.vendor = result.data.name[0];
				}
			})
			.catch((e) => {});
	}

	export const show = () => modal.show();
	export const hide = () => modal.hide();
</script>

<Modal bind:this={modal} title="Add New Vendor">
	<div class="min-w-[500px] px-2 py-5" slot="body">
		<div>
			<Label for="vendor_name" class="mb-2">Vendor Name</Label>
			<Input type="text" id="vendor_name" placeholder="e.g Google" name="vendor" bind:value={values.vendor} />
			{#if errors?.vendor}
				<p class="mt-1 text-xs text-red-500">{errors?.vendor}</p>
			{/if}
		</div>
	</div>

	<div class="text-end" slot="footer">
		<Button on:click={handle_save} size="xs">Save</Button>
	</div>
</Modal>
