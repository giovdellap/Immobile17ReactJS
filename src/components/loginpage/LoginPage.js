import React from "react";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/userActions";
import * as errorActions from "../../redux/actions/errorActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { OverlayTrigger, Button, Dropdown, Tooltip } from "react-bootstrap";
import LoginForm from "./LoginForm";
import { bindActionCreators } from "redux";

class LoginPage extends React.Component {
	componentDidMount() {
		const { error, actions } = this.props;
	}

	handleSubmit = (event) => {
		event.preventDefault();
		userActions.login(event);
	};

	render() {
		return (
			<>
				{typeof this.props.error === "undefined" ? (
					<LoginForm onSubmit={this.props.handleSubmit} />
				) : (
					<LoginForm
						error={this.props.error}
						onSubmit={this.props.handleSubmit}
					/>
				)}
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		error: state.error,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			login: bindActionCreators(userActions.login, dispatch),
			loginSuccess: bindActionCreators(
				userActions.loginSuccess,
				dispatch
			),
			errorLogin: bindActionCreators(errorActions.errorLogin, dispatch),
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
