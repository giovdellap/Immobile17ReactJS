import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost/Immobile17/api/";

export function sendLogin(email, password) {
	console.log("userApi: " + email + " " + password);
	const formData = new FormData();
	formData.append("email", email);
	formData.append("password", password);

	return fetch(baseUrl + "Utente/login", {
		method: "POST",
		body: formData,
	})
		.then(handleResponse)
		.catch(handleError);
}

export function getProfile(token) {
	return fetch(baseUrl + "token/" + token + "/Utente/visualizzaProfilo", {
		method: "GET",
	})
		.then(handleResponse)
		.catch(handleError);
}

export function registration(formDataObj) {
	const formData = new FormData();
	if (formDataObj.hasOwnProperty("nome")) {
		formData.append("nome", formDataObj.nome);
	}
	if (formDataObj.hasOwnProperty("cognome")) {
		formData.append("cognome", formDataObj.cognome);
	}
	if (formDataObj.hasOwnProperty("date")) {
		const toInvert = formDataObj.date.split("-");
		const newDate = toInvert[0] + "-" + toInvert[1] + "-" + toInvert[2];
		console.log("date: " + newDate);
		formData.append("date", newDate);
	}
	if (formDataObj.hasOwnProperty("email")) {
		formData.append("email", formDataObj.email);
	}
	if (formDataObj.hasOwnProperty("password")) {
		formData.append("password", formDataObj.password);
	}
	console.log(formDataObj);
	if (formDataObj.propic.size > 0) {
		formData.append("propic", formDataObj.propic);
		console.log("HO AGGIUNTO L'IMMAGINE SIIIIII");
	}
	return fetch(baseUrl + "Utente/registrazione", {
		method: "POST",
		body: formData,
	})
		.then(handleResponse)
		.catch(handleError);
}
