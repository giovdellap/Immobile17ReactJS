import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import newlogo from "../../styles/images/newlogo.png";
import { Container, Col, Row, Button } from "react-bootstrap";
import "../../styles/css/common.css";

class Header extends React.Component {
	componentDidMount() {
		const user = this.props;
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
					<Col md="5"></Col>
					<Col md="2">
						<NavLink to="/about">
							<Button variant="default" className="headerElement">
								<div className="headerElementText">
									CHI SIAMO
								</div>
							</Button>
						</NavLink>
					</Col>
					<Col md="3">
						{typeof this.props.user === "undefined" ? (
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
							<NavLink to="/areapersonale">
								<Button
									variant="default"
									className="headerElement"
								>
									<div className="headerElementText">
										CIAO, {this.props.user.utente.nome}
									</div>
								</Button>
							</NavLink>
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
	};
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
