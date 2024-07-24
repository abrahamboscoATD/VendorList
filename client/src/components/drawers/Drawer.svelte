<script lang="ts">
	import { browser } from "$app/environment";
	import Icon from "@iconify/svelte";
	import { fade, fly } from "svelte/transition";

	export let is_backdrop = true;
	export let title = "Drawer Title";
	let is_show = false;

	let z_index = 600;

	export function hide() {
		is_show = false;
	}

	export function show(z_index = 600) {
		is_show = true;
	}

	//Toogling Page Scrollbar on Drawer show and hide;
	$: if (is_show && browser) {
		document.body.style.overflow = `hidden`;
		document.body.style.paddingRight = `15px`;
	} else if (browser) {
		document.body.style.overflow = ``;
		document.body.style.paddingRight = ``;
	}
</script>

<!-- Backdrop -->
{#if is_backdrop && is_show}
	<div transition:fade={{ duration: 200 }} class="fixed left-0 top-0 h-screen w-full bg-stone-400/60" style="z-index:{z_index - 1}"></div>
{/if}

{#if is_show}
	<div
		transition:fly={{ x: 300, duration: 200 }}
		class="fixed right-0 top-0 flex h-screen w-fit min-w-[450px] flex-col"
		style="z-index: {z_index}"
	>
		<div class="flex justify-between rounded-tl-xl bg-stone-100 p-2 px-6">
			<h1 class="text-lg font-medium">{@html title}</h1>
			<button on:click={hide} class="rounded-full border p-1 text-2xl hover:bg-stone-200 hover:text-red-500">
				<Icon icon="line-md:close" /></button
			>
		</div>
		<div class="flex-1 rounded-bl-xl bg-white">
			<slot />
		</div>
	</div>
{/if}

<style lang="postcss">
</style>
