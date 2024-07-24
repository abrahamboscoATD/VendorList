import Cookies from "js-cookie";
import { API_BASE, COOKIE } from "../config/default";

interface CFetchOptions {
	base_url: string;
	secure?: boolean;
}

/**
 * CFetch = Custom Fetch;
 * Nothing special about it. just wanted to reduce boilerplace;
 */
export default class CFetch {
	private base_url: string;
	private secure: boolean;
	private auth_token: string | null;

	constructor(option: CFetchOptions) {
		this.base_url = option.base_url;
		this.secure = Boolean(option.secure);
		this.auth_token = Cookies.get(COOKIE.AUTH) || null;
	}

	get(url: string, options?: RequestInit) {
		const headers = new Headers();
		headers.set("Content-type", "application/json");

		if (this.secure) {
			headers.append("Authorization", this.auth_token || "");
		}

		return fetch(`${this.base_url}${url}`, {
			method: "GET",
			...options,
			headers: {
				...headers,
				...options?.headers
			}
		});
	}

	post(url: string, body?: unknown, options?: RequestInit) {
		const headers = new Headers();
		headers.set("Content-type", "application/json");

		if (this.secure) {
			headers.append("Authorization", this.auth_token || "");
		}

		return fetch(`${this.base_url}${url}`, {
			method: "POST",
			body: JSON.stringify(body),
			...options,
			headers: {
				...headers,
				...options?.headers
			}
		});
	}

	put(url: string, body?: unknown, options?: RequestInit) {
		const headers = new Headers();
		headers.set("Content-type", "application/json");

		if (this.secure) {
			headers.append("Authorization", this.auth_token || "");
		}

		return fetch(`${this.base_url}${url}`, {
			method: "PUT",
			body: JSON.stringify(body),
			...options,
			headers: {
				...headers,
				...options?.headers
			}
		});
	}

	delete(url: string, body?: unknown, options?: RequestInit) {
		const headers = new Headers();
		headers.set("Content-type", "application/json");

		if (this.secure) {
			headers.append("Authorization", this.auth_token || "");
		}

		return fetch(`${this.base_url}${url}`, {
			method: "DELETE",
			body: JSON.stringify(body),
			...options,
			headers: {
				...headers,
				...options?.headers
			}
		});
	}
}

export const secureFetch = new CFetch({
	base_url: API_BASE,
	secure: true
});

export const cFetch = new CFetch({
	base_url: API_BASE
});
