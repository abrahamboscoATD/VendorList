<script lang="ts">
	import { onMount, tick } from "svelte";

	import Modal from "./Modal.svelte";
	import { Button } from "flowbite-svelte";
	import Icon from "@iconify/svelte";
	import { browser } from "$app/environment";

	let modal: Modal;
	let title = "Alert Popup";
	let text = "Are you Sure You are going to do this ?";
	let content = "";
	let type: "error" | "success" | "info" = "info";
	let modal_v_el: Text;

	if (browser) {
		modal_v_el = document.createTextNode("");
	}

	export const show = (_text: string, _content?: string, _type: typeof type = "info") => {
		return new Promise((resolve, reject) => {
			try {
				text = _text;
				content = _content || "";
				type = _type;

				modal.show();
				tick().then(() => {
					modal_v_el.addEventListener("saidYes", () => {
						modal.hide();
						resolve(true);
					});
					modal_v_el.addEventListener("saidNo", () => {
						modal.hide();
						resolve(false);
					});
				});
			} catch (e) {
				reject(e);
			}
		});
	};
</script>

<Modal bind:this={modal} {title}>
	<svelte:fragment slot="body">
		<slot>
			<div class="px-3 py-5 lg:w-[500px]">
				<div class="flex items-center gap-4">
					<div class="icon">
						{#if type === "error"}
							<Icon icon="simple-line-icons:info" class="text-3xl" />
						{:else if type === "info"}
							<Icon icon="simple-line-icons:info" class="mx-auto text-4xl text-sky-500" />
						{:else if type === "success"}
							<Icon icon="simple-line-icons:info" />
						{/if}
					</div>
					<p class="text-lg text-black">
						{@html text}
					</p>
				</div>
			</div>
		</slot>
	</svelte:fragment>

	<div class="flex justify-end gap-5 pt-1 text-end" slot="footer">
		<Button size="xs" color="green" on:click={() => modal_v_el.dispatchEvent(new CustomEvent("saidYes"))}>Yes</Button>
		<Button size="xs" color="red" on:click={() => modal_v_el.dispatchEvent(new CustomEvent("saidNo"))}>No</Button>
	</div>
</Modal>
