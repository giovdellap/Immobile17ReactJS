import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const RegistrationForm = ({ error, onSubmit }) => {
	return (
		<>
			<Form onSubmit={onSubmit}>
				<Form.Group>
					<Form.Text className="formError">{error}</Form.Text>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column md="3">
						Nome
					</Form.Label>
					<Col md="9">
						<Form.Control
							as="input"
							type="text"
							name="nome"
							required
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column md="3">
						Cognome
					</Form.Label>
					<Col md="9">
						<Form.Control
							as="input"
							type="text"
							name="cognome"
							required
						/>
					</Col>
				</Form.Group>
				<Form.Group>
					<Form.Label column md="3">
						Data di nascita
					</Form.Label>
					<Form.Control as="input" type="date" name="date" required />
				</Form.Group>
				<Form.Group>
					<Form.Label column md="3">
						Email
					</Form.Label>
					<Col md="9">
						<Form.Control
							as="input"
							type="email"
							name="email"
							required
						/>
					</Col>
				</Form.Group>
				<Form.Group>
					<Form.Label column md="3">
						Password
					</Form.Label>
					<Col md="9">
						<Form.Control
							as="input"
							type="text"
							name="password"
							required
						/>
					</Col>
				</Form.Group>
				<Form.Group>
					<Form.Label>Inserisci la tua immagine profilo</Form.Label>
					<Form.File type="file" name="propic" />
				</Form.Group>
				<Form.Row>
					<Button variant="primary" type="submit">
						REGISTRATI
					</Button>
				</Form.Row>
			</Form>
		</>
	);
};

export default RegistrationForm;
