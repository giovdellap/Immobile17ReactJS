import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";

const ImmobileView = (immobile) => {
	return (
		<Container fluid>
			<Row>
				<Carousel>
					{immobile.immobile.immagini.map((immagine) => (
						<Carousel.Item>
							<img
								className="d-block w-100"
								src={immagine}
								alt="immagine"
							/>
						</Carousel.Item>
					))}
				</Carousel>
			</Row>
			<Row>
				<h4>{immobile.immobile.prezzo} €</h4>
			</Row>
			<Row>
				<h2>{immobile.immobile.nome}</h2>
			</Row>
			<Row>
				<h4>
					Indirizzo: {immobile.immobile.indirizzo},{" "}
					{immobile.immobile.comune}
				</h4>
			</Row>
			<Row>{immobile.immobile.descrizione}</Row>
			<Row>
				<h4>Dimensioni: {immobile.immobile.grandezza}</h4>
			</Row>
		</Container>
	);
};

export default ImmobileView;
