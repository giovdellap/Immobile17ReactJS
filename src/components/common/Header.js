import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import newlogo from "../../styles/images/newlogo.png";
import { Container, Col, Row, Button, Dropdown } from "react-bootstrap";
import * as userActions from "../../redux/actions/userActions";
import * as tokenActions from "../../redux/actions/tokenActions";
import * as cookieManager from "../../utils/cookieManager";
import "../../styles/css/common.css";

class Header extends React.Component {
	shouldGetProfile(token, user) {
		if (
			Object.entries(token).length !== 0 &&
			Object.entries(user).length === 0
		) {
			this.props.actions.getProfileByToken(token).catch((error) => {
				alert("Caricamento fallito" + error);
			});
		}
	}

	componentDidMount() {
		const { token, user, actions } = this.props;
		const cookieToken = cookieManager.readCookie();
		console.log("HEADER TOKEN: " + cookieToken);
		if (cookieToken !== "NO COOKIE") {
			this.props.actions.loginSuccess(cookieToken);
		}

		this.shouldGetProfile(token, user);
	}

	componentDidUpdate(previousProps) {
		if (this.props.token !== previousProps.token) {
			this.shouldGetProfile(this.props.token, this.props.user);
		}
	}

	render() {
		return (
			<Container fluid className="header">
				<Row>
					<Col md="2">
						<NavLink to="/" exact>
							<img src={newlogo} alt="logo" />
						</NavLink>
					</Col>
					<Col md="4"></Col>
					<Col md="2">
						<NavLink to="/about">
							<Button variant="default" className="headerElement">
								<div className="headerElementText">
									CHI SIAMO
								</div>
							</Button>
						</NavLink>
					</Col>
					<Col md="4">
						{Object.entries(this.props.user).length === 0 ? (
							<NavLink to="/login">
								<Button
									variant="default"
									className="headerElement"
								>
									<div className="headerElementText">
										LOGIN
									</div>
								</Button>
							</NavLink>
						) : (
							<>
								<Dropdown>
									<Dropdown.Toggle
										variant="default"
										className="headerElement"
									>
										<div className="headerElementText">
											CIAO, {this.props.user.nome}
										</div>
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item>
											<NavLink to="/profile">
												AREA PERSONALE
											</NavLink>
										</Dropdown.Item>
										<Dropdown.Item
											onClick={this.props.actions.logout}
										>
											LOGOUT
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</>
						)}
					</Col>
				</Row>
			</Container>
		);
	}
}

Header.propTypes = {
	user: PropTypes.object,
};

function mapStateToProps(state) {
	return {
		user: state.user,
		token: state.token,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			getProfileByToken: bindActionCreators(
				userActions.getProfileByToken,
				dispatch
			),
			loginSuccess: bindActionCreators(
				tokenActions.loginSuccess,
				dispatch
			),
			logout: bindActionCreators(tokenActions.logout, dispatch),
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
