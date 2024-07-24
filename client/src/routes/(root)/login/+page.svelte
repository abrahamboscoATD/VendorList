<script lang="ts">
	import { Button, Checkbox, Label, Input } from "flowbite-svelte";
	import type { ActionData, PageServerData, PageServerLoad } from "./$types";
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import { get } from "svelte/store";
	import { goto } from "$app/navigation";
	import { addToast } from "@/components/shared/Toast.svelte";

	export let form: ActionData;

	$: if (form?.user) {
		const next = get(page).url.searchParams.get("next") || "/";
		goto(next);
	}

	$: if (form?.msg) {
		addToast({ msg: form.msg });
	}

	let remember = true;
</script>

<svelte:head>
	<title>Login in Vlink</title>
</svelte:head>

<section id="login" class="">
	<div class="mx-auto mt-20 w-[400px] space-y-4 rounded border bg-white p-6 sm:p-8 md:space-y-6">
		<form class="flex flex-col space-y-6" method="POST" use:enhance>
			<h3 class="p-0 text-center text-xl font-medium text-gray-900 dark:text-white">Admin Panel Login</h3>
			<Label class="space-y-2">
				<span>Username</span>
				<Input type="text" name="username" placeholder="e.g. nada_admin" required />
			</Label>
			<Label class="space-y-2">
				<span>password</span>
				<Input type="password" name="password" placeholder="•••••" required />
			</Label>
			<Checkbox bind:checked={remember}>Remember me</Checkbox>
			<input type="hidden" name="remember" value={remember} />
			<Button type="submit" class="w-full1">Sign in</Button>
		</form>
		<p class="text-center text-sm">Back to <a href="/admin" class="text-blue-500 underline">Home</a></p>
	</div>
</section>
