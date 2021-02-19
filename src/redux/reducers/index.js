import { combineReducers } from "redux";
import immobili from "./immobiliReducer";
import apiCallsInProgress from "./apiStatusReducer";
import token from "./tokenReducer";
import user from "./userReducer";
import error from "./errorReducer";

const rootReducer = combineReducers({
	immobili,
	user,
	token,
	error,
	apiCallsInProgress,
});

export default rootReducer;
