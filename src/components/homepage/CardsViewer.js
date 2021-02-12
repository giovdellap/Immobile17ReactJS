import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import CardImmobile from "../common/CardImmobile";
import "../../styles/css/homepage.css";

class CardsViewer extends React.Component {
	render() {
		return (
			<>
				<div className="cardsViewerTitle">IMMOBILI IN EVIDENZA</div>
				<div className="cardsViewerBody">
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
			</>
		);
	}
}

CardsViewer.propTypes = {
	immobili: PropTypes.array.isRequired,
};

export default CardsViewer;
