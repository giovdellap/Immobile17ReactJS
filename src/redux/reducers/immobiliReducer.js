import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function immobiliReducer(state = initialState.immobili, action) {
	switch (action.type) {
		case types.LOAD_IMMOBILI_HOMEPAGE_SUCCESS:
			return action.immobili;
		case types.LOAD_IMMOBILI_BY_ID_SUCCESS:
			return [...state].concat(action.newImmobili);
		case types.LOAD_IMMOBILE_SUCCESS:
			if (state.length === 0) {
				return [action.immobile];
			} else {
				var array = [];
				array.push(action.immobile);
				return [...state].concat(array);
			}
		case types.LOAD_IMMOBILI_BY_ID_AND_DELETE_SUCCESS:
			return action.immobili;
		default:
			return state;
	}
}
