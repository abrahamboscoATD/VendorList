<script>
	import AddApplicationForm from "@/components/forms/AddApplicationForm.svelte";
	import Block from "@/components/shared/Block.svelte";
</script>

<div class="max-w-[800px] mt-4 mx-auto">
	<Block>
		<h3 slot="title" class="text-lg font-medium">Add new Application</h3>
		<div class="p-2">
			<AddApplicationForm />
		</div>
	</Block>
</div>
