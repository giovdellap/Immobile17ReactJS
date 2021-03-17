import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Form, Button, Col, Container, Row } from "react-bootstrap";

/**
 *
 * @param error eventuale errore restituito dal server
 * @param onSubmit listener del submit button
 * @returns il rendering della login form
 */
const LoginForm = ({ error, onSubmit }) => {
	return (
		<Container fluid>
			<Row>
				<Form onSubmit={onSubmit}>
					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control
							as="input"
							type="email"
							name="email"
							bsPrefix="form-field user-form"
							required
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label className="formLabel">Password</Form.Label>
						<Form.Control
							as="input"
							type="password"
							name="password"
							bsPrefix="form-field user-form"
							required
						/>
					</Form.Group>

					<Form.Group>
						<Form.Text className="formError">{error}</Form.Text>
					</Form.Group>
					<Form.Row>
						<Col sm="6">
							<Form.Group>
								<Form.Check
									as="input"
									type="checkbox"
									label="Ricordami"
									name="rememberMe"
								/>
							</Form.Group>
						</Col>
						<Col sm="6">
							<Button
								variant="default"
								type="submit"
								bsPrefix="def-btn login-btn"
							>
								LOGIN
							</Button>
						</Col>
					</Form.Row>
				</Form>
			</Row>
			<Row>
				<Link to="/registration">
					<div className="aa-registration-link">REGISTRATI QUI</div>
				</Link>
			</Row>
		</Container>
	);
};

LoginForm.propTypes = {
	error: PropTypes.array,
};

export default LoginForm;
