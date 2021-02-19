import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Form, Button, Col, Container, Row } from "react-bootstrap";

const LoginForm = ({ error, onSubmit }) => {
	console.log("loginform");
	return (
		<Container fluid>
			<Row className="formRow">
				<Form onSubmit={onSubmit}>
					<Form.Group>
						<Form.Label className="formLabel">email</Form.Label>
						<Form.Control
							as="input"
							type="email"
							name="email"
							className="formControl"
							required
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label className="formLabel">Password</Form.Label>
						<Form.Control
							as="input"
							type="text"
							name="password"
							className="formControl"
							required
						/>
					</Form.Group>

					<Form.Group>
						<Form.Text className="formError">{error}</Form.Text>
					</Form.Group>
					<Form.Row>
						<Col sm="8">
							<Form.Group>
								<Form.Check
									as="input"
									type="checkbox"
									label="Ricordami"
									name="rememberMe"
									className="formCheckbox"
								/>
							</Form.Group>
						</Col>
						<Col sm="4">
							<Button
								variant="primary"
								type="submit"
								className="formSubmitButton"
							>
								LOGIN
							</Button>
						</Col>
					</Form.Row>
				</Form>
			</Row>
			<Row>
				<Link to="/registration">
					<div className="/registrationLink">REGISTRATI QUI</div>
				</Link>
			</Row>
		</Container>
	);
};

LoginForm.propTypes = {
	error: PropTypes.array,
};

export default LoginForm;
