import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import aquila1 from "../../images/homepage/aquila1.jpg";
import aquila4 from "../../images/homepage/aquila4.jpg";
import aquila5 from "../../images/homepage/aquila5.jpg";

/**
 *
 * @returns il Carousel di immagini della homepage
 */
const ImagesCarousel = () => {
	return (
		<Carousel>
			<Carousel.Item className="homepage-carousel-item">
				<img
					className="d-block w-100"
					src={aquila1}
					alt="First slide"
				/>
				<Carousel.Caption>
					<div className="text-on-image">
						<h3>CERCA LA TUA CASA IN AFFITTO A L'AQUILA</h3>
						<p>Soluzioni per studenti, lavoratori e famiglie</p>
					</div>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item className="homepage-carousel-item">
				<img
					className="d-block w-100"
					src={aquila4}
					alt="Third slide"
				/>

				<Carousel.Caption>
					<div className="text-on-image">
						<h3>ACQUISTA L'IMMOBILE CHE FA PER TE</h3>
					</div>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item className="homepage-carousel-item">
				<img
					className="d-block w-100"
					src={aquila5}
					alt="Third slide"
				/>

				<Carousel.Caption>
					<div className="text-on-image">
						<h3>SOLUZIONI PER TUTTE LE TASCHE</h3>
					</div>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
};

export default ImagesCarousel;
