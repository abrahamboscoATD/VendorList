import { type Handle } from "@sveltejs/kit";
import check_auth from "../server/checkAuth";

export const handle: Handle = async ({ event, resolve }) => {
	//if auth failed `check_auth` will redirect to login page;
	await check_auth(event);

	const response = await resolve(event);

	return response;
};
