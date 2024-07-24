import { redirect, type RequestEvent } from "@sveltejs/kit";
import { COOKIE } from "../config/default";

interface SvFetchOptions {
	secure?: boolean;
	base_url: string;
}

/**
 * Special Class from Sveltekit fetch. it canbe used for secure fetch or an Ordinary Fetch;
 *
 */
export class SvFetch {
	private fetch: RequestEvent["fetch"];
	private cookie: RequestEvent["cookies"];
	private event: RequestEvent;
	private secure = false;
	base_url: string;

	constructor(event: RequestEvent, option: SvFetchOptions) {
		this.fetch = event.fetch;
		this.cookie = event.cookies;
		this.event = event;
		this.secure = Boolean(option.secure);
		this.base_url = option.base_url;
	}

	private async check_auth() {
		const cookie = this.event.cookies.get(COOKIE.AUTH);
		if (!cookie) {
			console.log("Not Found Redirecting");
			redirect(307, `/login?next=${this.event.url.href}`);
		}
	}

	async get(url: string, option?: RequestInit) {
		if (this.secure) await this.check_auth();

		return this.fetch(`${this.base_url}${url}`, {
			method: "GET",
			headers: {
				authorization: `Bearer ${this.cookie.get(COOKIE.AUTH)}`,
				...option?.headers
			}
		});
	}

	async post(url: string, data?: unknown, option?: RequestInit) {
		if (this.secure) await this.check_auth();

		return this.fetch(`${this.base_url}${url}`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				authorization: `Bearer ${this.cookie.get(COOKIE.AUTH)}`,
				...option?.headers
			}
		});
	}

	async put(url: string, data?: unknown, option?: RequestInit) {
		if (this.secure) await this.check_auth();

		return this.fetch(`${this.base_url}${url}`, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				authorization: `Bearer ${this.cookie.get(COOKIE.AUTH)}`,
				...option?.headers
			}
		});
	}
	async delete(url: string, data?: unknown, option?: RequestInit) {
		if (this.secure) await this.check_auth();

		return this.fetch(`${this.base_url}${url}`, {
			method: "DELETE",
			body: JSON.stringify(data),
			headers: {
				authorization: `Bearer ${this.cookie.get(COOKIE.AUTH)}`,
				...option?.headers
			}
		});
	}
}
