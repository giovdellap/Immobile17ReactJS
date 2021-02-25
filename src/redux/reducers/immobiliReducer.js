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
				console.log("if reducer");
				return [action.immobile];
			} else {
				console.log("else reducer");
				var array = [];
				array.push(action.immobile);
				return [...state].concat(array);
			}
		default:
			return state;
	}
}
