/** @type {import('tailwindcss').Config}*/
const config = {
	content: ["./src/**/*.{html,js,svelte,ts}", "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}", "./node_modules/flowbite/**/*.js"],

	plugins: [require("flowbite/plugin")],

	darkMode: "class",

	theme: {
		extend: {
			colors: {
				// flowbite-svelte
				primary: {
					50: "#f3f6fb",
					100: "#e4e8f5",
					200: "#cfd8ee",
					300: "#aebfe2",
					400: "#879ed3",
					500: "#647ac4",
					600: "#5767b9",
					700: "#4d57a8",
					800: "#43498a",
					900: "#393f6f",
					950: "#272944"
				}
			}
		}
	}
};

module.exports = config;
