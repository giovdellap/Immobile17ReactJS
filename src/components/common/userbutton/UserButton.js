import React from "react";
import { connect } from "react-redux";
import * as userActions from "../../../redux/actions/userActions";
import * as errorActions from "../../../redux/actions/errorActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { OverlayTrigger, Button, Dropdown, Tooltip } from "react-bootstrap";
import LoginForm from "./LoginForm";
import { bindActionCreators } from "redux";

class UserButton extends React.Component {
	componentDidMount() {
		const { user, error, actions } = this.props;
	}

	handleSubmit = (event) => {
		event.preventDefault();
		userActions.login(event);
	};

	render() {
		const ref = React.createRef();
		return (
			<>
				{typeof this.props.user === "undefined" ? (
					<OverlayTrigger
						trigger="click"
						placement="bottom"
						overlay={showForm}
						ref="ref"
					>
						<Button className="loginButton">LOGIN</Button>
					</OverlayTrigger>
				) : (
					<Dropdown>
						<Dropdown.Toggle className="userButton">
							{this.props.user.utente.nome}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item className="userItem">
								<Link to="/areaPersonale">Area Personale</Link>
							</Dropdown.Item>
							<Dropdown.Item>LOGOUT</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				)}
			</>
		);
	}
}

const showForm = React.forwardRef((props, ref) =>
	typeof this.props.error === "undefined" ? (
		<LoginForm onSubmit={props.handleSubmit} />
	) : (
		<LoginForm error={props.error} onSubmit={props.handleSubmit} />
	)
);

const renderTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		Simple tooltip
	</Tooltip>
);

function mapStateToProps(state) {
	console.log("stateuser" + state.user);
	console.log("stateerror" + state.error);
	return {
		user: state.user,
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

export default connect(mapStateToProps, mapDispatchToProps)(UserButton);
