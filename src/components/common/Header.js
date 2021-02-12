import React from "react";
import { NavLink } from "react-router-dom";
import newlogo from "../../styles/images/newlogo.png";
import { Container, Col, Row, Button } from "react-bootstrap";
import "../../styles/css/common.css";
import UserButton from "./userbutton/UserButton";

const Header = () => {
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
							<div className="headerElementText">CHI SIAMO</div>
						</Button>
					</NavLink>
				</Col>
				<Col md="3">
					<UserButton />
				</Col>
			</Row>
		</Container>
	);
};

export default Header;
