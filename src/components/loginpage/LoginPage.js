import React from "react";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/userActions";
import * as errorActions from "../../redux/actions/errorActions";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { OverlayTrigger, Button, Dropdown, Tooltip } from "react-bootstrap";
import LoginForm from "./LoginForm";
import { bindActionCreators } from "redux";

class LoginPage extends React.Component {
	componentDidMount() {
		const { user, error, actions } = this.props;
	}

	handleSubmit = (event) => {
		event.preventDefault();
		userActions.login(event);
	};

	render() {
		if (typeof this.props.user !== "undefined") {
			return <Redirect to="/homepage" />;
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
