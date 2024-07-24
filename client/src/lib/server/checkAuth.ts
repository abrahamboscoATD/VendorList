import { redirect, type RequestEvent } from "@sveltejs/kit";
import { SvFetch } from "../helpers/svFetch";
import { API_BASE, COOKIE } from "../config/default";

type TProtectedRoute = {
	route: string;
	match: "exact" | "startWith";
};
const protectedRoutes: TProtectedRoute[] = [
	{
		route: "/admin/add-application",
		match: "exact"
	},
	{
		route: "/settings",
		match: "startWith"
	}
];

function got_protected_route(path: string) {
	return new Promise((resolve) => {
		for (const { route, match } of protectedRoutes) {
			switch (match) {
				case "exact":
					if (route !== "" && path === route) {
						return resolve(true);
					}
					break;
				case "startWith":
					if (route !== "" && path.startsWith(route)) {
						return resolve(true);
					}
			}
		}
		resolve(false);
	});
}

/* 
01705568633
 */

async function verify_auth(event: RequestEvent) {
	const svFetch = new SvFetch(event, { secure: false, base_url: API_BASE });

	const decoded_data = await (await svFetch.get(`/auth/verify-session`)).json();

	//If Invalid jwt ;
	if (!decoded_data.success) {
		return redirect(307, `/login?next=${event.url.href}`);
	}
	event.locals.user = decoded_data.data;
}

export default async function check_auth(event: RequestEvent) {
	if (event.cookies.get(COOKIE.AUTH)) {
		console.log("Found Cookie");
		await verify_auth(event);
	} else if (await got_protected_route(event.url.pathname)) {
		await verify_auth(event);
	}
}
