import React from "react";
import { Container, Col, Row, Image, Button } from "react-bootstrap";
import { dateStringConverter } from "../../utils/dateUtils";

/**
 * Effettua il rendering delle informazioni dell'utente
 */
class UserViewer extends React.Component {
	render() {
		return (
			<Container fluid>
				<Row className="mainRow">
					<Col md="6">
						<div className="image">
							<Image
								src={this.props.user.immagine}
								roundedCircle
								className="profile-image"
							/>
						</div>
					</Col>
					<Col md="6">
						<div className="profile-info">
							<Row>
								{this.props.user.nome} {this.props.user.cognome}
							</Row>
							<Row>{this.props.user.mail}</Row>
							<Row>
								Nato il{" "}
								{dateStringConverter(
									this.props.user.dataNascita
								)}
							</Row>
							{this.props.user.attivato ? (
								<></>
							) : (
								<Row className="profile-checkEmail">
									Controlla la tua email per attivare il
									profilo
								</Row>
							)}
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default UserViewer;
