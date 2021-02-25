import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function tokenReducer(state = initialState.token, action) {
	console.log("tokenReducer: " + action.type);
	switch (action.type) {
		case types.LOGIN_SUCCESS:
			return action.token;
		case types.REGISTRATION_SUCCESS:
			return action.token;
		case types.LOGOUT:
			return {};
		case types.ERROR_TOKEN:
			return {};
		default:
			return state;
	}
}
