import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import CalendarSection from "./calendar/CalendarSection";
import MapContainer from "../common/MapContainer";

/**
 * Effettua il render della scheda immobile
 * @param {*} immobile l'immobile da visualizzare
 * @returns
 */
const ImmobileView = (immobile) => {
	return (
		<Container fluid className="aa-properties">
			<Row className="carousel-section">
				<Carousel className="carousel-immobile">
					{immobile.immobile.immagini.map((immagine) => (
						<Carousel.Item>
							<img
								className="d-block w-100 carousel-image"
								src={immagine}
								alt="immagine"
							/>
						</Carousel.Item>
					))}
				</Carousel>
			</Row>
			<Row>
				<Col md="7" className="left-col">
					<div className="aa-properties-details">
						<Row>
							<div className="aa-price-immobile">
								{immobile.immobile.prezzo} €
							</div>
						</Row>
						<Row>
							<div className="title-immobile">
								<h2>{immobile.immobile.nome}</h2>
							</div>
						</Row>
						<Row>
							<h4>
								Indirizzo: {immobile.immobile.indirizzo},{" "}
								{immobile.immobile.comune}
							</h4>
						</Row>
						<Row>
							<div className="aa-descrizione">
								{immobile.immobile.descrizione}
							</div>
						</Row>
						<Row>
							<h4>
								Dimensioni: {immobile.immobile.grandezza} mq
							</h4>
						</Row>
					</div>
				</Col>

				<Col md="5" className="right-col">
					<Row>
						<div className="calendar-section">
							<CalendarSection id={immobile.immobile.id} />
						</div>
					</Row>
					<Row className="map-row">
						<div className="map-section">
							<MapContainer
								indirizzo={
									immobile.immobile.indirizzo +
									", " +
									immobile.immobile.comune
								}
								nomeImmobile={immobile.immobile.nome}
							/>
						</div>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default ImmobileView;
