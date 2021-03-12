import React from "react";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/userActions";
import * as errorActions from "../../redux/actions/errorActions";
import * as tokenActions from "../../redux/actions/tokenActions";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import UserViewer from "./UserViewer";
import ChangePasswordButton from "./ChangePasswordButton";
import CalendarSection from "./calendar/CalendarSection";
import { Container, Row, Col } from "react-bootstrap";

/**
 * Effettua il rendering della profile page
 */
class ProfilePage extends React.Component {
	render() {
		return (
			<Container fluid>
				<Row className="profile-page">
					<Col md="6">
						{Object.entries(this.props.user).length === 0 ? (
							<Redirect to="/login" />
						) : (
							<UserViewer user={this.props.user} />
						)}
					</Col>
					<Col md="6">
						<Row>
							<ChangePasswordButton />
						</Row>
						<Row>
							<CalendarSection />
						</Row>
					</Col>
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
