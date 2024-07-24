<script lang="ts" context="module">
	import { writable } from "svelte/store";

	export interface IGlobalModalData {
		title?: string;
		text: string;
		content: string;
		type: "info" | "success" | "error";
		id?: string;
	}

	const globalModalStore = writable<IGlobalModalData[]>([]);
</script>

<script lang="ts">
	import Modal from "./Modal.svelte";
	import { onMount } from "svelte";

	let modal: Modal;

	onMount(() => modal.show());
</script>

<Modal bind:this={modal}></Modal>
