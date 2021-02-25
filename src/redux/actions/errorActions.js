import * as types from "./actionTypes";

export function errorLogin(error) {
	return { type: types.ERROR_LOGIN, error };
}

export function clearErrorState() {
	console.log("errorActions clear error state");
	return { type: types.CLEAR_ERROR_STATE };
}

export function errorToken() {
	return { type: types.ERROR_TOKEN };
}

export function errorRegistration(error) {
	return { type: types.ERROR_REGISTRATION, error };
}

export function errorLoadImmobile(error) {
	return { type: types.ERROR_LOAD_IMMOBILE, error };
}

export function errorChangePassword(error) {
	return { type: types.ERROR_CHANGE_PASSWORD, error };
}
