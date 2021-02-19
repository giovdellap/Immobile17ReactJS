import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducer(state = initialState.user, action) {
	console.log("reducer: " + action.type);
	switch (action.type) {
		case types.GET_PROFILE_BY_TOKEN_SUCCESS:
			return action.user;
		case types.REGISTRATION_SUCCESS:
			return action.user;
		case types.LOGOUT:
			return {};
		default:
			return state;
	}
}
