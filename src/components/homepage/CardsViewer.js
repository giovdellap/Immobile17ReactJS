import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import CardImmobile from "../common/CardImmobile";

/**
 * Effettua il rendering della sezione immobili della homepage
 */
class CardsViewer extends React.Component {
	render() {
		return (
			<div id="view-cards" className="view-cards-area">
				<div className="view-cards-title">
					<h2>IMMOBILI IN EVIDENZA</h2>
					<span></span>
					<p>Guarda gli immobili che abbiamo scelto per te</p>
				</div>
				<div className="view-cards-content">
					<Container>
						<Row>
							<Col md={4}>
								<CardImmobile
									immobile={this.props.immobili[0]}
								></CardImmobile>
							</Col>
							<Col md={4}>
								<CardImmobile
									immobile={this.props.immobili[1]}
								></CardImmobile>
							</Col>
							<Col md={4}>
								<CardImmobile
									immobile={this.props.immobili[2]}
								></CardImmobile>
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		);
	}
}

CardsViewer.propTypes = {
	immobili: PropTypes.array.isRequired,
};

export default CardsViewer;
