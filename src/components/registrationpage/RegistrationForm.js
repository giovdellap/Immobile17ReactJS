import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

/**
 *
 * @param error l'eventuale errore da mostrare all'utente
 * @param onSubmit il listener del submit button
 * @returns la form di registrazione
 */
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
							bsPrefix="form-field user-form"
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
							bsPrefix="form-field user-form"
							required
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column md="3">
						Data di nascita
					</Form.Label>
					<Col md="9">
						<Form.Control
							as="input"
							type="date"
							name="date"
							bsPrefix="form-field user-form"
							required
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column md="3">
						Email
					</Form.Label>
					<Col md="9">
						<Form.Control
							as="input"
							type="email"
							name="email"
							bsPrefix="form-field user-form"
							required
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column md="3">
						Password
					</Form.Label>
					<Col md="9">
						<Form.Control
							as="input"
							type="text"
							name="password"
							bsPrefix="form-field user-form"
							required
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column md="3">
						Inserisci la tua immagine profilo
					</Form.Label>
					<Col md="9">
						<Form.File type="file" name="propic" />{" "}
					</Col>
				</Form.Group>
				<Form.Row>
					<Button
						variant="default"
						type="submit"
						bsPrefix="def-btn registration-btn"
					>
						REGISTRATI
					</Button>
				</Form.Row>
			</Form>
		</>
	);
};

export default RegistrationForm;
