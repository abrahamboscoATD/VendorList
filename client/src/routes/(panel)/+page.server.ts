import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (event) => {
	const user = event.locals.user;

    if(user) redirect(307,"/admin");
    else redirect(307, "/applications")
};
