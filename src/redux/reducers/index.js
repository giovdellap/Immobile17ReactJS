import { combineReducers } from "redux";
import immobili from "./immobiliReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
	immobili,
	apiCallsInProgress,
});

export default rootReducer;
