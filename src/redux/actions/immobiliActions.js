import * as types from "./actionTypes";
import * as immobiliApi from "../../api/immobiliApi";
import * as errorActions from "./errorActions";
import { beginApiCall, apiCallError } from "./apiStatusActions";

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

export function loadImmobiliHomepageSuccess(immobili) {
	return { type: types.LOAD_IMMOBILI_HOMEPAGE_SUCCESS, immobili };
}

export function ricerca(parameters) {
	return function (dispatch) {
		dispatch(beginApiCall());
		var visualizzazione = { ids: [], params: parameters };
		return immobiliApi.ricerca(parameters).then((idList) => {
			visualizzazione.ids = idList;
			dispatch(ricercaSuccess(visualizzazione));
		});
	};
}

export function ricercaSuccess(visualizzazione) {
	return { type: types.RICERCA_SUCCESS, visualizzazione };
}

export function loadImmobiliById(visualizzazione, page, immobili) {
	return function (dispatch) {
		const firstId = (page - 1) * 9;
		var pageIds = visualizzazione.ids.slice(firstId, firstId + 9);
		immobili.forEach((element) => {
			if (pageIds.includes(element.id)) {
				const index = pageIds.indexOf(element.id);
				pageIds.splice(index, 1);
			}
		});
		if (pageIds.length !== 0) {
			dispatch(beginApiCall());
			return immobiliApi.getImmobiliByID(pageIds).then((newImmobili) => {
				if (newImmobili.error === "undefined") {
					const missingIds = newImmobili["error"].split("/");
					missingIds.forEach((element) => {
						const index = visualizzazione.ids.indexOf(element);
						visualizzazione.ids.splice(index);
					});
					newImmobili.splice("error");
				}
				dispatch(loadImmobiliByIdSuccess(visualizzazione, newImmobili));
			});
		} else {
			dispatch(loadImmobiliByIdSuccess(visualizzazione, []));
		}
	};
}

export function loadImmobiliByIdSuccess(visualizzazione, newImmobili) {
	return {
		type: types.LOAD_IMMOBILI_BY_ID_SUCCESS,
		visualizzazione,
		newImmobili,
	};
}

export function loadImmobile(id) {
	return function (dispatch) {
		dispatch(beginApiCall());
		return immobiliApi.getImmobile(id).then((immobile) => {
			if (immobile.hasOwnProperty("error")) {
				dispatch(
					errorActions.errorLoadImmobile("IMMOBILE NON PRESENTE")
				);
			} else {
				dispatch(loadImmobileSuccess(immobile));
			}
		});
	};
}

export function loadImmobileSuccess(immobile) {
	return { type: types.LOAD_IMMOBILE_SUCCESS, immobile };
}
