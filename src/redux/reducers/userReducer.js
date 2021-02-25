import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducer(state = initialState.user, action) {
	console.log("userReducer: " + action.type);
	switch (action.type) {
		case types.GET_PROFILE_BY_TOKEN_SUCCESS:
			console.log("REDUCER: " + typeof action.user.appuntamenti);
			return action.user;
		case types.REGISTRATION_SUCCESS:
			return action.user;
		case types.LOGOUT:
			return {};
		case types.PASSWORD_CHANGE_SUCCESS:
			return action.user;
		case types.GET_APPUNTAMENTI_SUCCESS:
			return action.user;
		default:
			return state;
	}
}
