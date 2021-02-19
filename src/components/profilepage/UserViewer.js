import React from "react";
import { Container, Col, Row, Image, Button } from "react-bootstrap";
import { dateStringConverter } from "../../utils/utils";
import "../../styles/css/profilepage.css";

class UserViewer extends React.Component {
	render() {
		return (
			<Container fluid>
				<Row className="mainRow">
					<Col md="4">
						<Image
							src={this.props.user.immagine}
							roundedCircle
							className="image"
						/>
					</Col>
					<Col md="8">
						<Row className="informationRow">
							{this.props.user.nome} {this.props.user.cognome}
						</Row>
						<Row className="informationRow">
							{this.props.user.mail}
						</Row>
						<Row className="informationRow">
							Nato il{" "}
							{dateStringConverter(this.props.user.dataNascita)}
						</Row>
						{this.props.user.attivato ? (
							<></>
						) : (
							<Row className="checkEmailRow">
								Controlla la tua email per attivare il profilo
							</Row>
						)}
						<Row>
							<Button
								variant="primary"
								className="changePasswordButton"
							>
								CAMBIA PASSWORD
							</Button>
						</Row>
						<Row>
							<Button
								variant="primary"
								className="deleteAccountButton"
							>
								ELIMINA ACCOUNT
							</Button>
						</Row>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default UserViewer;
