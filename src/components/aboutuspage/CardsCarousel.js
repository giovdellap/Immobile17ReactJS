import React from "react";
import { Carousel } from "react-bootstrap";
import PropTypes from "prop-types";
import CardImmobile from "../common/CardImmobile";

/**
 * Effettua il render del Carousel delle Card Immobile della AboutUs Page
 */
class CardsCarousel extends React.Component {
	render() {
		return (
			<div className="cardscarousel">
				<Carousel>
					{this.props.immobili.map((immobile) => {
						return (
							<Carousel.Item key={immobile.id}>
								<div className="d-block w-100">
									<CardImmobile immobile={immobile} />
								</div>
							</Carousel.Item>
						);
					})}
				</Carousel>
			</div>
		);
	}
}

CardsCarousel.propTypes = {
	immobili: PropTypes.array.isRequired,
};

export default CardsCarousel;
