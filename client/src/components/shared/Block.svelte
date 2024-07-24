<script lang="ts">
	export let id = globalThis.crypto.randomUUID();

	let className = "";
	export let style: "havvy" | "light" | "bordered" = "havvy";
	export { className as class };
</script>

<div class="h-fit rounded-md border bg-white {className} {style === 'light' ? '' : style === 'bordered' ? '' : 'shadow'}" {id}>
	<div class="border-b p-3 py-1 {style === 'light' ? 'bg-zinc-50' : style === 'bordered' ? 'bg-transparent' : 'bg-zinc-100 shadow'} {id}-title">
		<slot name="title" />
	</div>
	<div class="element p-3 {id}-element"><slot /></div>
</div>

<style lang="postcss">
</style>
