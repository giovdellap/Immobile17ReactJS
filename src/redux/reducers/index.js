import { combineReducers } from "redux";
import immobili from "./immobiliReducer";
import apiCallsInProgress from "./apiStatusReducer";
import token from "./tokenReducer";
import user from "./userReducer";
import error from "./errorReducer";
import visualizzazione from "./visualizzazioneReducer";

const rootReducer = combineReducers({
	immobili,
	user,
	token,
	error,
	visualizzazione,
	apiCallsInProgress,
});

export default rootReducer;
