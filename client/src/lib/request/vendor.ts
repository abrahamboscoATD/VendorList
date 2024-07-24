import { cFetch } from "../helpers/fetch";

export function getAllVendors() {
	return cFetch.get("/vendor/get-all").then((res) => res.json());
}
