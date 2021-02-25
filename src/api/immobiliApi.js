import { handleResponse, handleError } from "./apiUtils";
const baseURL = "http://localhost/Immobile17/api";

export function getImmobiliHomepage() {
	return fetch(baseURL + "/Home/homepage", { method: "GET" })
		.then(handleResponse)
		.catch(handleError);
}

export function ricerca(parameters) {
	var pathURL = "";
	console.log("PARAMS: " + parameters);
	for (const property in parameters) {
		pathURL = pathURL + "/" + property + "/" + parameters[property];
	}
	return fetch(baseURL + "/Immobile/ricerca" + pathURL, { method: "GET" })
		.then(handleResponse)
		.catch(handleError);
}

export function getImmobiliByID(ids) {
	var pathURL = "";
	for (let i = 0; i < ids.length; i++) {
		pathURL = pathURL + ids[i];
		if (i !== ids.length - 1) {
			pathURL = pathURL + "-";
		}
	}
	return fetch(baseURL + "/Immobile/getImmobili/" + pathURL)
		.then(handleResponse)
		.catch(handleError);
}

export function getImmobile(id) {
	return fetch(baseURL + "/Immobile/visualizza/" + id)
		.then(handleResponse)
		.catch(handleError);
}
