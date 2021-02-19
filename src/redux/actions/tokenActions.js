import * as types from "./actionTypes";
import * as userApi from "../../api/userApi";
import * as errorActions from "./errorActions";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import * as cookieManager from "../../utils/cookieManager";

export function login(email, password, rememberMe) {
	console.log("action login mail: " + email);
	console.log("action login pw: " + password);
	return function (dispatch) {
		console.log("action login");
		dispatch(beginApiCall());
		return userApi
			.sendLogin(email, password)
			.then((loginResponse) => {
				console.log("userAction: " + loginResponse);
				if (loginResponse.hasOwnProperty("error")) {
					dispatch(errorActions.errorLogin(loginResponse.error));
				} else {
					cookieManager.createCookie(loginResponse);
					dispatch(loginSuccess(loginResponse));
				}
			})
			.catch((error) => {
				dispatch(apiCallError(error));
				throw error;
			});
	};
}

export function loginSuccess(token) {
	console.log("loginSuccess " + token);
	return { type: types.LOGIN_SUCCESS, token };
}

export function logout() {
	if (cookieManager.readCookie() !== "NO COOKIE") {
		cookieManager.eraseCookie();
	}
	return { type: types.LOGOUT };
}
