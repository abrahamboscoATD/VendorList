<script lang="ts">
	import { Button, Input, Label, Select } from "flowbite-svelte";
	import { ZodError, z } from "zod";
	import type { HTMLFormAttributes } from "svelte/elements";
	import AutoComplete, { type TAutoCompleteData } from "@/components/forms/element/AutoComplete.svelte";
	import { API_BASE } from "@/lib/config/default";
	import { addToast } from "../shared/Toast.svelte";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { get } from "svelte/store";
	import { getAllVendors } from "@/lib/request/vendor";

	const form_validator = z.object({
		vendor: z.string().min(1, "Vendor is Required"),
		application: z.string().min(1, "Vendor is Required"),
		phone: z.string().min(1, "Phone Number is required"),
		email: z.string().min(1, "Email is Required").email("Please enter a Valid Email"),
		support_level: z.enum(["l1", "l2", "l3"], {
			required_error: "Please Select one Support Level",
			invalid_type_error: "Please select from the Dropdown"
		}),
		full_name: z.string().min(1, "Full Name Cannot be empty").optional()
	});

	let form_error: ZodError<z.infer<typeof form_validator>>["formErrors"]["fieldErrors"] | null;
	let vendors_data: TAutoCompleteData[] = [];
	let form_el: HTMLFormElement;
	let vendor_autocomplete: AutoComplete;
	let countries = [
		{ value: "l1", name: "Support Level 1" },
		{ value: "l2", name: "Support Level 2" },
		{ value: "l3", name: "Suuport Level 3" }
	];
	let selected_support_level: "" | "l1" | "l2" | "l3";

	let form_status = "";

	const handle_submit: HTMLFormAttributes["on:submit"] = (e) => {
		const form_data = Object.fromEntries(new FormData(e.currentTarget).entries());

		form_validator.safeParseAsync(form_data).then((result) => {
			if (!result.success) {
				form_error = result.error.formErrors.fieldErrors;
				return;
			} else {
				form_error = null;

				const userId = get(page).data?.user?._id;
				if (!userId) return addToast({ msg: "You are not Logged in" });

				fetch(`${API_BASE}/application-list/add-one`, {
					method: "POST",
					headers: {
						"Content-Type": "Application/json"
					},
					body: JSON.stringify({
						application: result.data.application,
						vendor: result.data.vendor,
						support_level: result.data.support_level,
						email: result.data.email,
						phone: result.data.phone,
						added_by: userId
					})
				})
					.then((response) => response.json())
					.then((_data) => {
						if (!_data.success) {
							addToast({ msg: "Falied to create application" });
						} else {
							form_el.reset();
							vendor_autocomplete.reset();
							addToast({ msg: "Successfully Created Application" });
						}
					});
			}
		});
	};

	$: console.log(selected_support_level);

	//Getting All Vendor To show the list;
	onMount(() => {
		getAllVendors().then((result) => {
			if (!result.success) return addToast({ msg: "Failed to Get vendors data" });
			vendors_data = result.data?.map?.((v: any) => ({ label: v.name, value: v._id }));
		});
	});

</script>

<form bind:this={form_el} on:submit|preventDefault={handle_submit}>
	<div class="mb-4">
		<Label for="vendor" class="mb-2">Select Vendor</Label>
		<AutoComplete
			bind:this={vendor_autocomplete}
			name="vendor"
			id="search-vendor-autocomplete"
			data={vendors_data}
			placeholder="Select Vendor"
		/>
		{#if form_error?.vendor}
			<p class="mt-1 text-xs text-red-500">{form_error.vendor}</p>
		{/if}
	</div>
	<div class="mb-4">
		<Label for="applicaiton_title" class="mb-2">Application Title</Label>
		<Input type="text" name="application" id="applicaiton_title" placeholder="Application Name" />

		{#if form_error?.application}
			<p class="mt-1 text-xs text-red-500">{form_error.application}</p>
		{/if}
	</div>
	<div class="mb-4">
		<Label for="support_level" class="mb-2"
			>Support Level

			<Select class="mt-2" name="support_level" bind:value={selected_support_level} items={countries} placeholder="Select Support Level" />
		</Label>
		{#if form_error?.support_level}
			<p class="mt-1 text-xs text-red-500">{form_error.support_level}</p>
		{/if}
	</div>

	{#if !["", "l1"].includes(selected_support_level)}
		<div class="mb-4">
			<Label for="full_name" class="mb-2">Name</Label>
			<Input type="text" name="full_name" id="full_name" placeholder="eg. Nada Alruwaish" />

			{#if form_error?.full_name}
				<p class="mt-1 text-xs text-red-500">{form_error.full_name}</p>
			{/if}
		</div>
	{/if}

	<div class="mb-4">
		<Label for="phone_number" class="mb-2">Phone number</Label>
		<Input type="text" name="phone" id="phone_number" placeholder="+12345678" />

		{#if form_error?.phone}
			<p class="mt-1 text-xs text-red-500">{form_error.phone}</p>
		{/if}
	</div>
	<div class="mb-4">
		<Label for="email_name" class="mb-2">Email</Label>
		<Input type="email" name="email" id="email_name" placeholder="Nada@mail.com" />

		{#if form_error?.email}
			<p class="mt-1 text-xs text-red-500">{form_error.email}</p>
		{/if}
	</div>

	<Button type="submit">Submit</Button>
</form>

<style lang="postcss">
	:global(#search-vendor-autocomplete) {
		@apply text-sm;
	}
</style>
