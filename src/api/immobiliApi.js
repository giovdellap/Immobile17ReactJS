import { handleResponse, handleError } from "./apiUtils";
const baseURL = "http://localhost/Immobile17/api";

export function getImmobiliHomepage() {
	return fetch(baseURL + "/Home/homepage", { method: "GET" })
		.then(handleResponse)
		.catch(handleError);
}

export function ricerca(parameters) {
	var pathURL = "";
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

export function getAppuntamentiLiberi(token, id, inizio, fine) {
	return fetch(
		baseURL +
			"/token/" +
			token +
			"/Immobile/calendario/id/" +
			id +
			"/inizio/" +
			inizio +
			"/fine/" +
			fine
	)
		.then(handleResponse)
		.catch(handleError);
}

export function sendPrenotation(token, appuntamento, start, end) {
	const formData = new FormData();
	formData.append("idCl", appuntamento.idCliente);
	formData.append("idIm", appuntamento.immobile);
	formData.append("idAg", appuntamento.idAgente);
	formData.append("inizio", appuntamento.inizio);
	formData.append("fine", appuntamento.fine);
	formData.append("agInizio", start.slice(0, 10));
	formData.append("agFine", end.slice(0, 10));
	return fetch(baseURL + "/token/" + token + "/Immobile/prenota", {
		method: "POST",
		body: formData,
	})
		.then(handleResponse)
		.catch(handleError);
}
