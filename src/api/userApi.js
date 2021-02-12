import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost/Immobile17/api/Utente";

export function sendLogin(email, password) {
	const formData = new FormData();
	formData.append("email", email);
	formData.append("password", password);
	return fetch(baseUrl + "/Login", {
		method: "POST",
		body: formData,
	})
		.then(handleResponse)
		.catch(handleError);
}
