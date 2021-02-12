import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Col } from "react-bootstrap";

const LoginForm = ({ error, onSubmit }) => {
	console.log("loginform");
	return (
		<>
			{console.log("daiiiii")}
			{console.log(error)}
			{console.log(onSubmit)}
			<div>
				<h5>cacca</h5>
			</div>
			<Form onSubmit={onSubmit}>
				<Form.Group>
					<Form.Label className="formLabel">email</Form.Label>
					<Form.Control type="email" className="formControl" />
				</Form.Group>
				<Form.Group>
					<Form.Label className="formLabel">Password</Form.Label>
					<Form.Control type="password" className="formControl" />
				</Form.Group>

				<Form.Group>
					<Form.Text className="formError">{error}</Form.Text>
				</Form.Group>
				<Form.Row>
					<Col sm="8">
						<Form.Group>
							<Form.Check
								type="checkbox"
								label="Ricordami"
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
		</>
	);
};

LoginForm.propTypes = {
	error: PropTypes.string,
};

export default LoginForm;
