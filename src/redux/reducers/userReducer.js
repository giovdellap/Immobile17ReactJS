import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducer(state = initialState.user, action) {
	switch (action.type) {
		case types.GET_PROFILE_BY_TOKEN_SUCCESS:
			return action.user;
		case types.REGISTRATION_SUCCESS:
			return action.user;
		case types.LOGOUT:
			return {};
		case types.PASSWORD_CHANGE_SUCCESS:
			return action.user;
		case types.GET_APPUNTAMENTI_SUCCESS:
			return action.user;
		case types.PRENOTA_APPUNTAMENTO_SUCCESS:
			var array = [];
			array.push(action.appuntamento);
			var newUser = { ...state };
			newUser.appuntamenti = newUser.appuntamenti.concat(array);
			return newUser;
		default:
			return state;
	}
}
