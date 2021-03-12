import { combineReducers } from "redux";
import immobili from "./immobiliReducer";
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
});

export default rootReducer;
