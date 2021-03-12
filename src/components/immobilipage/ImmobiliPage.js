import React from "react";
import SearchBar from "./SearchBar";
import ImmobiliViewer from "./ImmobiliViewer";

/**
 * Effettua il rendering della immobili page
 * @param params i parametri della ricerca
 * @returns
 */
const ImmobiliPage = (params) => {
	return (
		<>
			{typeof params === "undefined" ? (
				<SearchBar />
			) : (
				<SearchBar params={params} />
			)}
			<ImmobiliViewer />
		</>
	);
};

export default ImmobiliPage;
