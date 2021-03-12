import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Container, Button } from "react-bootstrap";

/**
 * Effettua il render della Card descrittiva dell'immobile
 * @param this.props.immobile l'immobile da visualizzare
 */
class CardImmobile extends React.Component {
	render() {
		return (
			<div id="view-cards" className="view-cards-area">
				<Card>
					<Container fluid className="card-item">
						<Row>
							<Card.Img
								variant="top"
								src={this.props.immobile.immagini[0]}
								className="card-image"
							/>
						</Row>
						<Row>
							<Card.Body className="card-content">
								<Container fluid>
									<div className="card-content">
										<Row>
											<Card.Title>
												<Link
													to={
														"/immobile/" +
														this.props.immobile.id
													}
													className="card-title"
												>
													<h5>
														{
															this.props.immobile
																.nome
														}
													</h5>
												</Link>
											</Card.Title>
										</Row>
										<Row>
											<div className="card-item-about">
												<p>
													{this.props.immobile.descrizione.substring(
														0,
														187
													)}
													{"..."}
												</p>
											</div>
										</Row>
									</div>
									<div className="card-item-detial">
										<Row>
											<div className="card-indirizzo">
												{this.props.immobile.indirizzo},{" "}
												{this.props.immobile.comune}
											</div>
										</Row>
										<Row className="cardLastRow">
											<Col md={6}>
												<div className="card-item-info card-prezzo">
													{this.props.immobile.prezzo}
													{" €"}
												</div>
											</Col>
											<Col md={6}>
												<div className="card-item-info card-grandezza">
													{
														this.props.immobile
															.grandezza
													}
													{" mq"}
												</div>
											</Col>
										</Row>
									</div>
								</Container>
							</Card.Body>
						</Row>
					</Container>
				</Card>
			</div>
		);
	}
}

export default CardImmobile;
