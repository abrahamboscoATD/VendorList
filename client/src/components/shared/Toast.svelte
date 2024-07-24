<script context="module" lang="ts">
	export interface IToast {
		type: "success" | "error" | "warning" | "info";
		msg: string;
		uid: string;
	}

	const toastStore = writable<IToast[]>([]);

	export function addToast(data: Partial<IToast> & { msg: string }, autoClose = 3000) {
		if (!data.uid) data.uid = globalThis.crypto.randomUUID();

		toastStore.update((prev) => [
			...prev,
			{
				type: data?.type || "info",
				msg: data.msg,
				uid: data.uid as string
			}
		]);

		if (autoClose > 0) {
			setTimeout(() => toastStore.update((prev) => prev.filter((v) => v.uid !== data.uid)), autoClose);
		}
	}
</script>

<script lang="ts">
	import { writable } from "svelte/store";
	import Icon from "@iconify/svelte";

	function remove(uid: string) {
		toastStore.update((prev) => prev.filter((d) => d.uid !== uid));
	}
</script>

{#if $toastStore.length}
	<div class="fixed right-0 top-0 z-[501] max-h-screen pr-5 pt-5">
		{#each $toastStore as toastData}
			<div id="toast-default" class="mb-1 flex w-full max-w-xs items-center rounded-lg border bg-white p-4 text-gray-500" role="alert">
				<div class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-500">
					<Icon icon="mdi-light:home" />
				</div>
				<div class="mx-3 text-sm font-normal">{toastData.msg}</div>
				<button
					type="button"
					on:click={() => remove(toastData.uid)}
					class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-red-500"
				>
					<Icon icon="humbleicons:times" />
				</button>
			</div>
		{/each}
	</div>
{/if}
