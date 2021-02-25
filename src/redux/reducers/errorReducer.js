import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsInSuccess(type) {
	return type.substring(type.length - 8) === "_SUCCESS";
}

export default function errorReducer(state = initialState.error, action) {
	if (action.type.substring(action.type.length - 8) === "_SUCCESS") {
		return [];
	} else if (action.type.substring(0, 6) === "ERROR") {
		return action.error;
	} else return state;
}
