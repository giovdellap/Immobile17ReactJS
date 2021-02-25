import React from "react";
import ImagesCarousel from "./ImagesCarousel";
import ImmobiliSection from "../common/ImmobiliSection";
import SearchButtonSection from "./SearchButtonSection";

const HomePage = () => {
	return (
		<>
			<ImagesCarousel />
			<SearchButtonSection />
			<ImmobiliSection homepage={true} />
		</>
	);
};

export default HomePage;
