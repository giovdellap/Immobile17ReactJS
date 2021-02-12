import React from "react";
import ImmobiliSection from "../common/ImmobiliSection";
import { Container, Row, Col, Image } from "react-bootstrap";
import aboutUs from "../../styles/images/aboutUsPage/aboutUs.jpg";
import Text from "../../styles/txt/aboutUs.txt";

const HomePage = () => {
	return (
		<>
			<Container fluid>
				<Row>
					<Col md={8}>
						<div className="body">
							<Row>
								<div className="image">
									<Image
										src={aboutUs}
										fluid
										className="image"
										rounded
									/>
								</div>
							</Row>
							<Row>
								<div className="text">{text()}</div>
							</Row>
						</div>
					</Col>
					<Col md={4}>
						<div className="immobili">
							<ImmobiliSection homepage={false} />
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
};

function text() {
	return (
		<>
			L'agenzia Immobile17 nasce dal desiderio di valorizzare al massimo
			l'esperienza maturata nel settore dal 2015. L'utilizzo del proprio
			nome nel marchio vuol essere sinonimo di massima serietà,
			trasparenza e correttezza, valori concreti sui quali è fondata la
			nostra piccola ma efficiente struttura. Un'attività giovane e
			contemporanea che opera selezionando minuziosamente le migliori
			opportunità immobiliari, sia in vendita che in locazione. Ogni
			immobile che scegliamo di trattare è altamente qualificato, completo
			di documentazione e preparato alla vendita.
		</>
	);
}

export default HomePage;
