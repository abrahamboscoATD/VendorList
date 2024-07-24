<script>
	import Toast from "@/components/shared/Toast.svelte";
	import "../app.pcss";
	import { browser } from "$app/environment";

	if (browser) {
		//@ts-ignore
		import("flowbite/dist/flowbite.min.js");
	}
</script>

<!-- Golbal Necessary Component -->
<Toast />
<slot />
