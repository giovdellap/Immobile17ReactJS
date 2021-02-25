import React from "react";
import SearchBar from "./SearchBar";
import ImmobiliViewer from "./ImmobiliViewer";

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
