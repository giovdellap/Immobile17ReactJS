import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { dateStringConverter } from "../../../utils/dateUtils";

/**
 *
 * @param immobile l'immobile dell'appuntamento
 * @param appuntamento l'appuntamento da visualizzare
 * @param cliente booleano che indica se bisogna visualizzare il cliente o l'agente immobiliare
 * @returns il rendering della scheda appuntamento
 */
const AppointmentCard = ({ immobile, appuntamento, cliente }) => {
	/**
	 *
	 * @param {*} time la stringa contenente data e ora
	 * @returns
	 */
	function getTimeString(time) {
		return time.slice(11, 16);
	}

	/**
	 * la card dell'utente da visualizzare
	 */
	const cardUtente = (
		<Row className="card-utente">
			<div className="card-utente-title">
				{cliente ? "AGENTE IMMOBILIARE: " : "CLIENTE: "}
			</div>
			<Image
				src={
					cliente ? appuntamento.fotoAgente : appuntamento.fotoCliente
				}
				thumbnail
			/>

			<div className="card-utente-text">
				{cliente ? appuntamento.nomeAgente : appuntamento.nomeCliente}
			</div>
			<div className="card-utente-text">
				{cliente ? appuntamento.mailAgente : appuntamento.mailCliente}
			</div>
		</Row>
	);

	/**
	 * La card contenente le informazioni sull'immobile
	 */
	const miniImmobile = (
		<div id="view-cards" className="view-cards-area">
			<Card>
				<Container fluid className="card-item">
					<Row>
						<Card.Img
							variant="top"
							src={immobile.immagini[0]}
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
												to={"/immobile/" + immobile.id}
												className="card-title"
											>
												<h5>{immobile.nome}</h5>
											</Link>
										</Card.Title>
									</Row>
								</div>
								<div className="card-item-detial">
									<Row>
										<div className="card-indirizzo">
											{immobile.indirizzo},{" "}
											{immobile.comune}
										</div>
									</Row>
									<Row className="cardLastRow">
										<Col md={6}>
											<div className="card-item-info card-prezzo">
												{immobile.prezzo}
												{" €"}
											</div>
										</Col>
										<Col md={6}>
											<div className="card-item-info card-grandezza">
												{immobile.grandezza}
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

	/**
	 * La sezione contenente le informazioni sull'appuntamento
	 */
	const appointmentSection = (
		<Row>
			<div className="appointment-section">
				DATA: {dateStringConverter(appuntamento.inizio.split("T")[0])}
				<br />
				INIZIO: {getTimeString(appuntamento.inizio)}
				<br />
				FINE: {getTimeString(appuntamento.fine)}
			</div>
		</Row>
	);

	return (
		<Container>
			<Row>
				<Col md="7">{miniImmobile}</Col>
				<Col md="5">
					{cardUtente}
					{appointmentSection}
				</Col>
			</Row>
		</Container>
	);
};

export default AppointmentCard;
