import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as userActions from "../../redux/actions/userActions";
import * as errorActions from "../../redux/actions/errorActions";
import RegistrationForm from "./RegistrationForm";

class RegistrationPage extends React.Component {
	componentDidMount() {}

	handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formDataObj = Object.fromEntries(formData.entries());
		console.log(formDataObj);
		this.props.actions.registration(formDataObj);
	};

	render() {
		if (Object.entries(this.props.user).length !== 0) {
			return <Redirect to="/" />;
		} else if (typeof this.props.error === "undefined") {
			return <RegistrationForm onsubmit={this.handleSubmit} />;
		} else
			return (
				<RegistrationForm
					onSubmit={this.handleSubmit}
					error={this.props.error}
				/>
			);
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
			registration: bindActionCreators(
				userActions.registration,
				dispatch
			),
			registrationSuccess: bindActionCreators(
				userActions.registrationSuccess,
				dispatch
			),
			errorRegistration: bindActionCreators(
				errorActions.errorRegistration,
				dispatch
			),
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
