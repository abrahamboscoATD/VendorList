// See https://kit.svelte.dev/docs/types#app

import type { IUser } from "@/lib/types/User";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: IUser;
		}
		interface PageData {
			user?: IUser;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
