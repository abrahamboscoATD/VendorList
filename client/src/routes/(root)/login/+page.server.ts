import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { z } from "zod";
import { API_BASE, COOKIE } from "@/lib/config/default";
import type { TAuthLoginResponse } from "@/lib/types/api_respones/external/auth_login";

export const actions = {
	default: async (event) => {
		try {
			const validator = z.object({
				username: z.string().min(1, "username cannot be empty").min(5, "username cannot be lower than 5 character"),
				password: z.string().min(1, "password cannot be empty").min(5, "password must be 8 character long"),
				remember: z
					.string()
					.optional()
					.transform((s) => s === "true")
			});

			const data = await validator.safeParseAsync(Object.fromEntries(await event.request.formData()));

			if (!data.success) {
				return fail(400, data.error.formErrors);
			}

			const login_res: TAuthLoginResponse = await (
				await event.fetch(`${API_BASE}/auth/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						username: data.data.username,
						password: data.data.password
					})
				})
			).json();

			if (!login_res.success) return fail(400, { msg: login_res.message });

			//Login Successful
			const days_from_now = (days: number) => {
				const d = new Date();
				d.setDate(d.getDate() + days);
				return d;
			};

			event.cookies.set(COOKIE.AUTH, login_res.data.token, {
				path: "/",
				expires: data.data.remember ? days_from_now(7) : new Date()
			});

			return {
				user: login_res.data.user
			};
		} catch (e) {
			if (e instanceof Error) {
				console.log(e);
				return fail(500, { msg: e.message });
			}
		}
	}
} satisfies Actions;
/* 
100% = 2400
1% = 24
50% = 1200
...


*/
