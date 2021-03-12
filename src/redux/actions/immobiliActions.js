import * as types from "./actionTypes";
import * as immobiliApi from "../../api/immobiliApi";
import * as errorActions from "./errorActions";
import {
	getIndexesNotInArray,
	getIndexesToMantainByPage,
} from "../../utils/actionUtils";

/**
 * Richiede gli immobili homepage
 */
export function loadImmobiliHomepage() {
	return function (dispatch) {
		return immobiliApi
			.getImmobiliHomepage()
			.then((immobili) => {
				dispatch(loadImmobiliHomepageSuccess(immobili));
			})
			.catch((error) => {
				throw error;
			});
	};
}

export function loadImmobiliHomepageSuccess(immobili) {
	return { type: types.LOAD_IMMOBILI_HOMEPAGE_SUCCESS, immobili };
}

/**
 * Crea un oggetto visualizzazione con i parametri della ricerca,
 * effettua una chiamata alle API, aggiunge gli id ricevuti all'oggetto visualizzazione
 * @param {*} parameters i parametri della ricerca
 */
export function ricerca(parameters) {
	return function (dispatch) {
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

/**
 * Controlla che tutti gli immobili da visualizzare nella page siano presenti
 * In caso contrario, richiede gli immobili mancanti tramite API
 * In caso riceva un messaggio di errore per un id, elimina l'immobile in questione
 * In caso il numero di immobili totali superi i 40, avvia la action di pulizia
 * @param {*} visualizzazione
 * @param {*} page
 * @param {*} immobili
 * @returns
 */
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
			return immobiliApi.getImmobiliByID(pageIds).then((newImmobili) => {
				if (newImmobili.error === "undefined") {
					const missingIds = newImmobili["error"].split("/");
					missingIds.forEach((element) => {
						const index = visualizzazione.ids.indexOf(element);
						visualizzazione.ids.splice(index);
					});
					newImmobili.splice("error");
				}
				if (immobili.length + newImmobili.length > 40) {
					dispatch(
						loadImmobiliByIdAndDelete(
							visualizzazione,
							page,
							immobili,
							newImmobili
						)
					);
				} else
					dispatch(
						loadImmobiliByIdSuccess(visualizzazione, newImmobili)
					);
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

/**
 * Effettua una pulizia degli immobili da non visualizzare in modo da avere massimo 40 elementi nello stato
 * @param {*} visualizzazione
 * @param {*} page
 * @param {*} immobili
 * @param {*} newImmobili
 */
export function loadImmobiliByIdAndDelete(
	visualizzazione,
	page,
	immobili,
	newImmobili
) {
	return function (dispatch) {
		var toDelete = immobili.length + newImmobili.length - 40;
		var idsToDelete = getIndexesNotInArray(
			visualizzazione.ids,
			immobili,
			toDelete
		);
		var newState = { ...immobili };
		if (visualizzazione.ids.length < 40) {
			for (let i = 0; i < toDelete; i++) {
				delete newState[idsToDelete[i]];
			}
		} else {
			toDelete = newState.length + newImmobili.length - 40;
			idsToDelete = getIndexesNotInArray(
				getIndexesToMantainByPage(visualizzazione.ids, page),
				newState,
				toDelete
			);
			if (visualizzazione.ids.length < 40) {
				for (let i = 0; i < toDelete; i++) {
					delete newState[idsToDelete[i]];
				}
			}
		}
		dispatch(loadImmobiliByIdAndDeleteSuccess(newState));
	};
}

export function loadImmobiliByIdAndDeleteSuccess(immobili) {
	return { type: types.LOAD_IMMOBILI_BY_ID_AND_DELETE_SUCCESS, immobili };
}

/**
 * Richiede tramite API l'immobile in questione
 * @param {*} id id immobile
 */
export function loadImmobile(id) {
	return function (dispatch) {
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

/**
 * Effettua la prenotazione dell'appuntamento tramite API
 * @param {*} token token utente
 * @param {*} appuntamento appuntamento da prenotare
 * @param {*} start data inizio visualizzazione appuntamenti
 * @param {*} end data fine visualizzazione appuntamenti
 */
export function prenotaAppuntamento(token, appuntamento, start, end) {
	return function (dispatch) {
		return immobiliApi
			.sendPrenotation(token, appuntamento, start, end)
			.then((app) => {
				if (app.hasOwnProperty("error")) {
					dispatch(
						errorActions.errorPrenotaAppuntamento(
							"APPUNTAMENTO NON DISPONIBILE"
						)
					);
				} else {
					dispatch(prenotaAppuntamentoSuccess(app));
				}
			});
	};
}

export function prenotaAppuntamentoSuccess(appuntamento) {
	return { type: types.PRENOTA_APPUNTAMENTO_SUCCESS, appuntamento };
}
