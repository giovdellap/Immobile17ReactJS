import React from "react";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/userActions";
import * as errorActions from "../../redux/actions/errorActions";
import * as tokenActions from "../../redux/actions/tokenActions";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import { bindActionCreators } from "redux";

/**
 * classe per la gestione della page di login
 */
class LoginPage extends React.Component {
	/**
	 * listener della login form
	 * Effettua il dispatch della action login estraendo i dati dall'evento
	 * @param {*} event
	 */
	handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formDataObj = Object.fromEntries(formData.entries());
		const rememberMe = formDataObj.hasOwnProperty("rememberMe");
		this.props.actions.login(
			formDataObj.email,
			formDataObj.password,
			rememberMe
		);
	};

	render() {
		if (Object.entries(this.props.user).length !== 0) {
			return <Redirect to="/" />;
		} else if (typeof this.props.error === "undefined") {
			return <LoginForm onSubmit={this.handleSubmit} />;
		} else {
			return (
				<LoginForm
					error={this.props.error}
					onSubmit={this.handleSubmit}
				/>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		error: state.error,
		user: state.user,
		token: state.token,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			login: bindActionCreators(tokenActions.login, dispatch),
			loginSuccess: bindActionCreators(
				tokenActions.loginSuccess,
				dispatch
			),
			errorLogin: bindActionCreators(errorActions.errorLogin, dispatch),
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
