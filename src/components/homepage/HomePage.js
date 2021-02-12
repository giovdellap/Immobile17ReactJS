import React from "react";
import ImagesCarousel from "./ImagesCarousel";
import ImmobiliSection from "../common/ImmobiliSection";

const HomePage = () => {
	return (
		<>
			<ImagesCarousel />
			<ImmobiliSection homepage={true} />
		</>
	);
};

export default HomePage;
