import * as types from "./actionTypes";
import * as userApi from "../../api/userApi";
import * as errorActions from "./errorActions";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function login(email, password) {
	return function (dispatch) {
		dispatch(beginApiCall());
		return userApi
			.sendLogin(email, password)
			.then((loginResponse) => {
				loginResponse.hasOwnProperty("error")
					? dispatch(errorActions.errorLogin(loginResponse.error))
					: dispatch(loginSuccess(loginResponse));
			})
			.catch((error) => {
				dispatch(apiCallError(error));
				throw error;
			});
	};
}

export function loginSuccess(user) {
	return function (dispatch) {
		dispatch(errorActions.clearErrorState);
		return { type: types.LOGIN_SUCCESS, user };
	};
}
