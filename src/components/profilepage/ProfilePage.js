import React from "react";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/userActions";
import * as errorActions from "../../redux/actions/errorActions";
import * as tokenActions from "../../redux/actions/tokenActions";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import UserViewer from "./UserViewer";

class ProfilePage extends React.Component {
	componentDidMount() {}

	render() {
		if (Object.entries(this.props.user).length === 0) {
			return <Redirect to="/login" />;
		} else return <UserViewer user={this.props.user} />;
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
