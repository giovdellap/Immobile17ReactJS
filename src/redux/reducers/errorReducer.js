import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsInSuccess(type) {
	return type.substring(type.length - 8) === "_SUCCESS";
}

export default function errorReducer(state = initialState.error, action) {
	switch (action.type) {
		case types.ERROR_LOGIN:
			return action.error;

		default:
			if (actionTypeEndsInSuccess(action.type)) {
				return [];
			}
			return state;
	}
}
