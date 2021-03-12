import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import newlogo from "../../images/newlogo.png";

/**
 * Esegue il render dl footer dell'applicazione
 * @returns footer dell'applicazione
 */
const Footer = () => {
	return (
		<div className="footer-umberto-tozzi">
			<Row className="footer-area">
				<Col md="6">
					<div className="footer-left">
						<img src={newlogo} alt="logo" className="footer-logo" />
						<div className="footer-info">
							<p>TEL: 0862 433812</p>
							<p>MAIL: admin@admin.it</p>
							<p>L'Aquila(AQ), via Enrico de Nicola 17</p>
						</div>
					</div>
				</Col>
				<Col md="6">
					<Table variant="default" className="footer-table">
						<tbody className="footer-table">
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
		</div>
	);
};

export default Footer;
