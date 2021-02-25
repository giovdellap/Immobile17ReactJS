import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardImmobile from "../../common/CardImmobile";

const AppointmentCard = ({ immobile, appuntamento }) => {
	return (
		<Container>
			<Row>
				<Col md="8">
					<CardImmobile immobile={immobile} />
				</Col>
				<Col md="4">
					<Row></Row>
				</Col>
			</Row>
		</Container>
	);
};

export default AppointmentCard;
