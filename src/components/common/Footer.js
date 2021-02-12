import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Col, Row, Table } from "react-bootstrap";
import newlogo from "../../styles/images/newlogo.png";
import "../../styles/css/common.css";

const Footer = () => {
	return (
		<Container fluid className="footer">
			<Row>
				<Col md="6">
					<img src={newlogo} alt="logo" className="footerLogo" />
					<div className="footerInfo">
						<p>TEL: 0862 433812</p>
						<p>MAIL: admin@admin.it</p>
						<p>L'Aquila(AQ), via Enrico de Nicola 17</p>
					</div>
				</Col>
				<Col md="6">
					<Table className="footerTable">
						<tbody className="footerTableBody">
							<tr>
								<td>Lunedì - Venerdì</td>
								<td>08:00 - 20:00</td>
							</tr>
							<tr>
								<td>Sabato</td>
								<td>Chiuso</td>
							</tr>
							<tr>
								<td>Domenica</td>
								<td>Chiuso</td>
							</tr>
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

export default Footer;
