import * as types from "./actionTypes";
import * as userApi from "../../api/userApi";
import * as errorActions from "./errorActions";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import { base64Converter } from "../../utils/utils";

export function getProfileByToken(token) {
	return function (dispatch) {
		console.log("getProfilebytoken");
		dispatch(beginApiCall());
		return userApi
			.getProfile(token)
			.then((response) => {
				response.hasOwnProperty("nome")
					? dispatch(getProfileByTokenSuccess(response))
					: dispatch(errorActions.errorToken);
			})
			.catch((error) => {
				dispatch(apiCallError(error));
				throw error;
			});
	};
}

export function getProfileByTokenSuccess(user) {
	return { type: types.GET_PROFILE_BY_TOKEN_SUCCESS, user };
}

export function registration(formDataObj) {
	return function (dispatch) {
		dispatch(beginApiCall());
		return userApi.registration(formDataObj).then((response) => {
			if (response.hasOwnProperty("error")) {
				dispatch(errorActions.errorRegistration(response));
			} else {
				formDataObj.dataNascita = formDataObj.date;
				base64Converter(formDataObj.propic).then(function (result) {
					console.log("ACQUA LETE");
					formDataObj.immagine = result;
				});
				delete formDataObj.date;
				delete formDataObj.propic;
				dispatch(registrationSuccess(response, formDataObj));
			}
		});
	};
}

export function registrationSuccess(token, user) {
	return { type: types.REGISTRATION_SUCCESS, token, user };
}

export function changePassword(oldPw, newPw, user, token) {
	return function (dispatch) {
		dispatch(beginApiCall());
		return userApi.changePassword(oldPw, newPw, token).then((response) => {
			if (response.hasOwnProperty("error")) {
				dispatch(errorActions.errorChangePassword(response));
			} else {
				var toDispatch = { ...user };
				toDispatch.password = newPw;
				dispatch(changePasswordSuccess(toDispatch));
			}
		});
	};
}

export function changePasswordSuccess(user) {
	return { type: types.PASSWORD_CHANGE_SUCCESS, user };
}

export function getAppuntamenti(user, token) {
	return function (dispatch) {
		dispatch(beginApiCall());
		console.log("TOKEN ACTION: " + token);
		return userApi.getAppuntamenti(token).then((response) => {
			if (response.hasOwnProperty("error")) {
				dispatch(errorActions.errorToken());
			} else {
				var newUser = { ...user };
				newUser.appuntamenti = response;
				dispatch(getAppuntamentiSuccess(newUser));
			}
		});
	};
}

export function getAppuntamentiSuccess(user) {
	return { type: types.GET_APPUNTAMENTI_SUCCESS, user };
}
