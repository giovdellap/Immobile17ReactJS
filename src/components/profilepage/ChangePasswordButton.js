import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { OverlayTrigger, Popover, Button, Form } from "react-bootstrap";
import * as userActions from "../../redux/actions/userActions";

/**
 * Effettua il rendering del bottone e del popover contenente la form
 * Si occupa delle action per la connessione al server e l'aggiornamento dello stato
 */
class ChangePasswordButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: "" };
	}

	/**
	 * listener della form
	 * Effettua il dispatch della action changePassword
	 * @param {*} event
	 */
	handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formDataObj = Object.fromEntries(formData.entries());
		this.props.actions.changePassword(
			formDataObj.oldPassword,
			formDataObj.password,
			this.props.user,
			this.props.token
		);
	};

	/**
	 * Setta l'errore nello stato del componente se presente
	 * Nel caso la password sia stata cambiata correttamente allerta l'utente
	 * @param {*} prevProps
	 */
	componentDidUpdate(prevProps) {
		if (this.props.error !== prevProps.error) {
			this.setState({ error: this.props.error });
		}
		if (this.props.user.password !== prevProps.user.password) {
			document.getElementById("mainButton").click();
			alert("PASSWORD CAMBIATA");
		}
	}

	/**
	 *
	 * @param {*} error
	 * @returns il popover contenente la form
	 */
	popover = (error) => (
		<Popover>
			<Popover.Content>
				<Form onSubmit={this.handleSubmit}>
					<Form.Label>Vecchia password</Form.Label>
					<Form.Control
						as="input"
						type="text"
						name="oldPassword"
						bsPrefix="form-field user-form"
					/>
					{error !== "" ? (
						<Form.Text>Password errata</Form.Text>
					) : (
						<></>
					)}
					<Form.Label>Nuova password</Form.Label>
					<Form.Control
						as="input"
						type="text"
						name="password"
						bsPrefix="form-field user-form"
					/>
					<Button
						type="submit"
						bsPrefix="def-btn login-btn profile-page-btn"
					>
						CAMBIA PASSWORD
					</Button>
				</Form>
			</Popover.Content>
		</Popover>
	);

	render() {
		return (
			<OverlayTrigger
				trigger="click"
				placement="bottom"
				overlay={this.popover(this.state.error)}
			>
				<Button variant="default" bsPrefix="def-btn profile-page-btn">
					CAMBIA PASSWORD
				</Button>
			</OverlayTrigger>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
		token: state.token,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			changePassword: bindActionCreators(
				userActions.changePassword,
				dispatch
			),
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChangePasswordButton);
