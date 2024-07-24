import { COOKIE } from "@/lib/config/default";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions = {
	default: async (event) => {
		event.cookies.delete(COOKIE.AUTH, {
			path: "/"
		});
		redirect(303, "/admin");
	}
} satisfies Actions;
