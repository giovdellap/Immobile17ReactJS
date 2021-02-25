import React from "react";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/userActions";
import * as errorActions from "../../redux/actions/errorActions";
import * as tokenActions from "../../redux/actions/tokenActions";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import UserViewer from "./UserViewer";
import ChangePasswordButton from "./ChangePasswordButton";
import CalendarSection from "./calendar/CalendarSection";
import { Container, Row } from "react-bootstrap";

class ProfilePage extends React.Component {
	componentDidMount() {}

	render() {
		return (
			<Container fluid>
				<Row>
					{Object.entries(this.props.user).length === 0 ? (
						<Redirect to="/login" />
					) : (
						<UserViewer user={this.props.user} />
					)}
				</Row>
				<Row>
					<ChangePasswordButton />
				</Row>
				<Row>
					<CalendarSection />
				</Row>
			</Container>
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
		actions: {},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
