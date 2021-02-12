import * as types from "./actionTypes";
import * as immobiliApi from "../../api/immobiliApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadImmobiliHomepageSuccess(immobili) {
	return { type: types.LOAD_IMMOBILI_HOMEPAGE_SUCCESS, immobili };
}

export function loadImmobiliHomepage() {
	return function (dispatch) {
		dispatch(beginApiCall());
		return immobiliApi
			.getImmobiliHomepage()
			.then((immobili) => {
				dispatch(loadImmobiliHomepageSuccess(immobili));
			})
			.catch((error) => {
				dispatch(apiCallError(error));
				throw error;
			});
	};
}
