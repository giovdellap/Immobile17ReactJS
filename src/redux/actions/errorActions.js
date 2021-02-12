import * as types from "./actionTypes";

export function errorLogin(error) {
	return { type: types.ERROR_LOGIN, error };
}

export function clearErrorState() {
	return { type: types.CLEAR_ERROR_STATE };
}
