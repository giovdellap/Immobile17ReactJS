import { handleResponse, handleError } from "./apiUtils";
const baseURL = "http://localhost/Immobile17/api";

export function getImmobiliHomepage() {
	return fetch(baseURL + "/Home/homepage", { method: "GET" })
		.then(handleResponse)
		.catch(handleError);
}
