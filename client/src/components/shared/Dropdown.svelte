<script lang="ts">
	import { page } from "$app/stores";
	import actionOutsideClick from "@/lib/helpers/actionOutsideClick";
	import { tick } from "svelte";
	import type { ActionReturn } from "svelte/action";
	import { get } from "svelte/store";

	let isShow = false;
	let show = () => (isShow = true);
	let hide = () => (isShow = false);
	let toggle = () => {
		isShow = !isShow;
	};
</script>

<div class="group relative">
	<slot name="label" {isShow} {show} {hide} {toggle}>
		<button
			on:click={() => (isShow = !isShow)}
			type="button"
			class="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:me-0"
			id="user-menu-button"
		>
			<img class="h-8 w-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="User Avatar" />
		</button>
	</slot>
	{#if isShow}
		<div
			use:actionOutsideClick={{
				callback() {
					isShow = false;
				}
			}}
			class="absolute left-0 top-full min-w-[200px] rounded-lg border bg-white py-2 shadow"
		>
			<slot>
				<div class="border-b px-4 py-1">
					<p class="block text-sm text-gray-900 dark:text-white">{get(page).data?.user?.username}</p>
					<p class="block truncate text-sm text-gray-500 dark:text-gray-400">{get(page).data.user?.email}</p>
				</div>
				<ul class="p-3" aria-labelledby="user-menu-button">
					<li>
						<form action="/logout/" method="post">
							<button
								class="block w-full rounded border border-red-500 px-4 py-1 text-sm text-red-500 hover:bg-red-500 hover:text-white dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
								>Sign out</button
							>
						</form>
					</li>
				</ul>
			</slot>
		</div>
	{/if}
</div>

<style lang="postcss">
</style>
