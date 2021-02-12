import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import "../../styles/css/cardImmobile.css";

class CardImmobile extends React.Component {
	render() {
		return (
			<Card>
				<Container fluid>
					<Row className="imageRow">
						<Card.Img
							variant="top"
							src={this.props.immobile.immagini[0]}
							className="cardImage"
						/>
					</Row>
					<Row className="bodyRow">
						<Card.Body className="card">
							<Container fluid>
								<Row className="titleRow">
									<Card.Title>
										<Link
											to={
												"/visualizza/" +
												this.props.immobile.id
											}
											className="title"
										>
											{this.props.immobile.nome}
										</Link>
									</Card.Title>
								</Row>

								<Row className="indirizzoRow">
									<div className="indirizzo">
										{this.props.immobile.indirizzo},{" "}
										{this.props.immobile.comune}
									</div>
								</Row>
								<Row className="descrizioneRow">
									<div className="descrizione">
										{this.props.immobile.descrizione.substring(
											0,
											120
										)}
										{"..."}
									</div>
								</Row>
								<Row className="cardLastRow">
									<Col md={6}>
										<div className="prezzo">
											{this.props.immobile.prezzo}
											{" €"}
										</div>
									</Col>
									<Col md={6}>
										<div className="dimensione lastRowBox">
											{this.props.immobile.grandezza}
											{" mq"}
										</div>
									</Col>
								</Row>
							</Container>
						</Card.Body>
					</Row>
				</Container>
			</Card>
		);
	}
}

export default CardImmobile;
