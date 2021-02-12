import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import home1 from "../../styles/images/homepage/home1.jpg";
import home2 from "../../styles/images/homepage/home2.jpg";
import home3 from "../../styles/images/homepage/home3.png";

const ImagesCarousel = () => {
	return (
		<Carousel>
			<Carousel.Item>
				<img className="d-block w-100" src={home1} alt="First slide" />
				<Carousel.Caption>
					<h3>CERCA LA TUA CASA IN AFFITTO A L'AQUILA</h3>
					<p>Soluzioni per studenti, lavoratori e famiglie</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img className="d-block w-100" src={home2} alt="Third slide" />

				<Carousel.Caption>
					<h3>ACQUISTA L'IMMOBILE CHE FA PER TE</h3>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img className="d-block w-100" src={home3} alt="Third slide" />

				<Carousel.Caption>
					<h3>SOLUZIONI PER TUTTE LE TASCHE</h3>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
};

export default ImagesCarousel;
