import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function visualizzazioneReducer(
	state = initialState.visualizzazione,
	action
) {
	switch (action.type) {
		case types.RICERCA_SUCCESS:
			return action.visualizzazione;
		case types.LOAD_IMMOBILI_BY_ID_SUCCESS:
			return action.visualizzazione;
		default:
			return state;
	}
}
