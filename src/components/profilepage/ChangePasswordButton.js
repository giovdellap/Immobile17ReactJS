import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
	Container,
	Row,
	OverlayTrigger,
	Popover,
	Button,
	Form,
} from "react-bootstrap";
import * as userActions from "../../redux/actions/userActions";

class ChangePasswordButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: "" };
	}

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

	componentDidUpdate(prevProps) {
		if (this.props.error !== prevProps.error) {
			this.setState({ error: this.props.error });
		}
		if (this.props.user.password !== prevProps.user.password) {
			document.getElementById("mainButton").click();
		}
	}

	popover = (error) => (
		<Popover>
			<Popover.Content>
				<Form onSubmit={this.handleSubmit}>
					<Form.Label>Vecchia password</Form.Label>
					<Form.Control as="input" type="text" name="oldPassword" />
					{error !== "" ? (
						<Form.Text>Password errata</Form.Text>
					) : (
						<></>
					)}
					<Form.Label>Nuova password</Form.Label>
					<Form.Control as="input" type="text" name="password" />
					<Button type="submit">CAMBIA PASSWORD</Button>
				</Form>
			</Popover.Content>
		</Popover>
	);

	render() {
		return (
			<OverlayTrigger
				trigger="click"
				placement="right"
				overlay={this.popover(this.state.error)}
			>
				<Button variant="success" id="mainButton">
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
