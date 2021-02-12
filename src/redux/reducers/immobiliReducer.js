import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function immobiliReducer(state = initialState.immobili, action) {
	switch (action.type) {
		case types.LOAD_IMMOBILI_HOMEPAGE_SUCCESS:
			return action.immobili;
		default:
			return state;
	}
}
