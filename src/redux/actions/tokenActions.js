import * as types from "./actionTypes";
import * as userApi from "../../api/userApi";
import * as errorActions from "./errorActions";
import * as cookieManager from "../../utils/cookieManager";

/**
 * Effettua la chiamata alle API per il login
 * In caso positivo, effettua il dispatch del token ricevuto in risposta, in caso negativo del messaggio di errore
 * Nel caso rememberMe sia true, salva il token nel cookie
 * @param {*} email
 * @param {*} password
 * @param {*} rememberMe
 */
export function login(email, password, rememberMe) {
	return function (dispatch) {
		return userApi
			.sendLogin(email, password)
			.then((loginResponse) => {
				if (loginResponse.hasOwnProperty("error")) {
					dispatch(errorActions.errorLogin(loginResponse.error));
				} else {
					if (rememberMe) {
						cookieManager.createCookie(loginResponse);
					}
					dispatch(loginSuccess(loginResponse));
				}
			})
			.catch((error) => {
				throw error;
			});
	};
}

export function loginSuccess(token) {
	return { type: types.LOGIN_SUCCESS, token };
}

/**
 * Se il cookie è presente, lo elimina
 */
export function logout() {
	if (cookieManager.readCookie() !== "NO COOKIE") {
		cookieManager.eraseCookie();
	}
	return { type: types.LOGOUT };
}
