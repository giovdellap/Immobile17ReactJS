import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import newlogo from "../../images/newlogo.png";
import {
	Container,
	Col,
	Row,
	Button,
	Dropdown,
	DropdownButton,
	OverlayTrigger,
	Popover,
} from "react-bootstrap";
import * as userActions from "../../redux/actions/userActions";
import * as tokenActions from "../../redux/actions/tokenActions";
import * as cookieManager from "../../utils/cookieManager";
import LoginPage from "../loginpage/LoginPage";

/**
 * Effettua il render dell'Header dell'applicazione e gestisce il token e il login dell'utente
 */
class Header extends React.Component {
	/**
	 * Se il token è presente nello state e lo user non è presente,
	 * Chiama la action getProfileByToken
	 * @param {*} token
	 * @param {*} user
	 */
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

	/**
	 * se presente, salva il token contenuto nel cookie
	 * Chiama il metodo shouldGetProfile
	 */
	componentDidMount() {
		const { token, user } = this.props;
		const cookieToken = cookieManager.readCookie();
		if (cookieToken !== "NO COOKIE") {
			this.props.actions.loginSuccess(cookieToken);
		}
		this.shouldGetProfile(token, user);
	}

	/**
	 * Nel caso in cui sia stato effettuato il login, chiama il metodo shouldGetProfile
	 * @param {*} previousProps
	 */
	componentDidUpdate(previousProps) {
		if (this.props.token !== previousProps.token) {
			this.shouldGetProfile(this.props.token, this.props.user);
		}
	}

	/**
	 *
	 * @returns il popover con la loginPage
	 */
	popover = () => (
		<Popover>
			<Popover.Content>
				<LoginPage />
			</Popover.Content>
		</Popover>
	);

	render() {
		return (
			<Container fluid>
				<Row>
					<Col md="2">
						<NavLink to="/" exact>
							<img src={newlogo} alt="logo" />
						</NavLink>
					</Col>
					<Col md="4"></Col>
					<Col md="2">
						<NavLink to="/about">
							<Button variant="default" bsPrefix="header-btn">
								<div>CHI SIAMO</div>
							</Button>
						</NavLink>
					</Col>
					<Col md="4">
						{Object.entries(this.props.user).length === 0 ? (
							<OverlayTrigger
								trigger="click"
								placement="bottom"
								overlay={this.popover()}
							>
								<Button variant="default" bsPrefix="header-btn">
									LOGIN
								</Button>
							</OverlayTrigger>
						) : (
							<>
								<DropdownButton
									variant="default"
									bsPrefix="header-btn"
									title={"CIAO, " + this.props.user.nome}
								>
									<Dropdown.Item>
										<NavLink to="/profile">
											<div className="header-dropdown-item">
												AREA PERSONALE{" "}
											</div>
										</NavLink>
									</Dropdown.Item>
									<Dropdown.Item
										onClick={this.props.actions.logout}
									>
										{" "}
										<div className="header-dropdown-item">
											LOGOUT{" "}
										</div>
									</Dropdown.Item>
								</DropdownButton>
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
