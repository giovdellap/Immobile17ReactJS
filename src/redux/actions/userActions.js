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
