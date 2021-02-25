import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function immobiliReducer(state = initialState.immobili, action) {
	console.log("immobiliReducer: " + action.type);
	switch (action.type) {
		case types.LOAD_IMMOBILI_HOMEPAGE_SUCCESS:
			return action.immobili;
		case types.LOAD_IMMOBILI_BY_ID_SUCCESS:
			return [...state].concat(action.newImmobili);
		case types.LOAD_IMMOBILE_SUCCESS:
			console.log("REDUCER: " + Object.entries(action.immobile));
			if (state.length === 0) {
				return [action.immobile];
			} else {
				return [...state].splice(0, action.immobile);
			}
		default:
			return state;
	}
}
