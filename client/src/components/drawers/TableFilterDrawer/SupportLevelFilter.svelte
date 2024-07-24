<script lang="ts">
	import Block from "@/components/shared/Block.svelte";

	type TSupportLevel = { value: "l1" | "l2" | "l3"; label: string };
	let support_levels: TSupportLevel[] = [
		{ value: "l1", label: "Support Level 1" },
		{ value: "l2", label: "Support Level 2" },
		{ value: "l3", label: "Support Level 3" }
	];
	export let selected: TSupportLevel["value"][] = [];

	function handle_selection(_v: TSupportLevel, checked: boolean) {
		if (checked) {
			selected = [...selected, _v.value];
		} else {
			selected = selected.filter((item) => item !== _v.value);
		}
	}
</script>

<Block style="light" class="my-3">
	<h6 slot="title" class="">Filter by Support Level</h6>
	<div class="py-2">
		{#each support_levels as sl}
			<div class="mb-4 flex items-center">
				<input
					id="filter-support-level-{sl.value}"
					type="checkbox"
					value={sl.value}
					checked={selected.includes(sl.value)}
					on:change={(e) => handle_selection(sl, e.currentTarget.checked)}
					class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
				/>
				<label for="filter-support-level-{sl.value}" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{sl.label}</label>
			</div>
		{/each}
	</div>
</Block>
