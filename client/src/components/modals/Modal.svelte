<script>
	import Icon from "@iconify/svelte";
	import { createEventDispatcher } from "svelte";
	export let title = "Title";

	let isShow = false;
	let zIndex = 500;
	const dispatcher = createEventDispatcher();

	export function show(zIndex = 500) {
		zIndex = 500;
		isShow = true;
	}

	export function hide() {
		isShow = false;
	}

</script>

{#if isShow}
	<div class="fixed top-0 z-[500] h-full w-full bg-zinc-400/40">
		<div class="mx-auto mt-20 w-fit min-w-[350px] overflow-hidden rounded-lg bg-white shadow-lg shadow-slate-600/30">
			<div class="flex items-center justify-between border-b bg-slate-100 px-3 py-1">
				<h3>{@html title}</h3>
				<button
					class="rounded-full p-1 text-red-600 transition-all hover:bg-red-500 hover:text-white"
					on:click={() => {
						isShow = false;
						dispatcher("close");
					}}
				>
					<Icon icon="humbleicons:times" class="" /></button
				>
			</div>
			<div class="content p-3">
				<slot name="body" />
			</div>

			{#if $$slots.footer}
				<div class="border-b bg-slate-100 px-3 py-1">
					<slot name="footer" />
				</div>
			{/if}
		</div>
	</div>
{/if}
