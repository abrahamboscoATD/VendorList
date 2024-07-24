<script lang="ts">
	import { page } from "$app/stores";
	import { get } from "svelte/store";
	import Dropdown from "./Dropdown.svelte";
	const navbar_links = [
		{
			label: "Dashboard",
			link: "/admin",
			private: false
		},
		{
			label: "Applications",
			link: "/applications",
			private: false
		},
		{
			label: "Vendors",
			link: "/vendors",
			private: false
		},
		{
			label: "Settings",
			link: "/settings",
			private: true
		}
	];
	$: user = $page.data.user;
</script>

<nav class="fixed top-0 z-[499] w-screen border-b border-gray-200 bg-white shadow-sm shadow-zinc-100 dark:bg-gray-900">
	<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
		<!-- Navbar Logo -->
		<a href="/admin" class="flex items-center space-x-3 rtl:space-x-reverse">
			<h3 class="text-2xl font-black">
				<span class="text-[1.2em] text-primary-600">V</span><span class="text-[1.2em]">L</span><span>ink</span><span> </span>
			</h3>
		</a>

		<!-- Dropdown -->
		<div class="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
			{#if user}
				<Dropdown>
					<button
						slot="label"
						let:toggle
						on:click={(e) => {
							toggle();
							e.stopPropagation();
						}}
						type="button"
						class="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:me-0"
						id="user-menu-button"
					>
						<img class="h-8 w-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="User Avatar" />
					</button>
				</Dropdown>
			{:else}
				<a href="/login" class="rounded bg-primary-600 px-5 py-2 text-center text-sm text-white">Login</a>
			{/if}

			<!-- humburger -->
			<button
				data-collapse-toggle="navbar-menus"
				type="button"
				class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
			>
				<svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
				</svg>
			</button>
		</div>

		<div class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto" id="navbar-menus">
			<ul
				class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0"
			>
				{#each navbar_links as nl}
					{#if nl.private && !user}
						{#if user}
							<li>
								<a href={nl.link} class="block rounded text-slate-800" class:navbar-link-active={$page.url.pathname === nl.link}
									>{nl.label}</a
								>
							</li>
						{/if}
					{:else}
						<li>
							<a href={nl.link} class="block rounded text-slate-800" class:navbar-link-active={$page.url.pathname === nl.link}>{nl.label}</a
							>
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</div>
</nav>
<div class="h-[66px]"></div>

<style class="postcss">
	.navbar-link-active {
		@apply text-primary-500;
	}
</style>
