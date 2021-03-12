import React, { useState } from "react";
import { Form, Row, Col, Button, FormControl } from "react-bootstrap";

/**
 * Utilizza due campi dello stato (prezzo/grandezza) per la gestione degli slider
 * @param onSubmit listener del submit button
 * @param parameters i parametri della ricerca precedente
 * @returns il rendering della form di ricerca
 */
const SearchForm = ({ onSubmit, parameters }) => {
	const [prezzo, setPrezzo] = useState(
		parameters.hasOwnProperty("pmax") ? parameters.pmax : 1000000
	);
	const [grandezza, setGrandezza] = useState(
		parameters.hasOwnProperty("gmin") ? parameters.gmin : 20
	);

	return (
		<div className="search-form-area">
			<Form onSubmit={onSubmit}>
				<Row className="search-form-top">
					<Col md="4" className="search-form-field">
						<Form.Group className="search-form-group">
							<Form.Control
								as="input"
								type="text"
								name="pc"
								placeholder="Parola Chiave"
								custom="true"
								className="form-field"
							/>
						</Form.Group>
					</Col>
					<Col md="3" className="search-form-field">
						<Form.Group className="search-form-group">
							<Form.Control
								as="select"
								name="ti"
								bsPrefix="form-field"
							>
								{getTipologiaAnnuncioOptions(parameters)}
							</Form.Control>
						</Form.Group>
					</Col>
					<Col md="3" className="search-form-field">
						<Form.Group className="search-form-group">
							<Form.Control
								as="select"
								name="tp"
								bsPrefix="form-field"
							>
								{getTipologiaImmobileOptions(parameters).map(
									function (tipologia) {
										return <option>{tipologia}</option>;
									}
								)}
							</Form.Control>
						</Form.Group>
					</Col>
					<Col md="2" className="aa-single-advance-search">
						<div className="form-search-btn">
							<Button
								variant="default"
								bsPrefix="def-btn search-btn"
								type="submit"
							>
								CERCA
							</Button>
						</div>
					</Col>
				</Row>
				<Row className="search-form-bottom">
					<Col md="6">
						<Form.Group>
							<Row className="form-range-input-row">
								<Col md="6">
									<Form.Label
										custom="true"
										className="form-range-label"
									>
										Prezzo Massimo: €
									</Form.Label>
								</Col>
								<Col md="6">
									<Form.Control
										as="input"
										type="text"
										name="pmax"
										custom="true"
										className="form-range-input"
										value={prezzo}
										onChange={(e) =>
											setPrezzo(e.target.value)
										}
									/>
								</Col>
							</Row>
							<Form.Control
								type="range"
								min="10000"
								max="1000000"
								value={prezzo}
								name="pmax"
								id="prezzo"
								step="10000"
								onChange={(e) => setPrezzo(e.target.value)}
							/>
						</Form.Group>
					</Col>
					<Col md="6">
						<Form.Group>
							<Row className="form-range-input-row">
								<Col md="6">
									<Form.Label
										custom="true"
										className="form-range-label"
									>
										Grandezza Minima: mq
									</Form.Label>
								</Col>
								<Col md="6">
									<Form.Control
										as="input"
										type="text"
										name="gmin"
										custom="true"
										className="form-range-input"
										value={grandezza}
										onChange={(e) =>
											setGrandezza(e.target.value)
										}
									/>
								</Col>
							</Row>
							<Form.Control
								type="range"
								min="10"
								max="2000"
								value={grandezza}
								name="gmin"
								id="grandezza"
								step="10"
								onChange={(e) => setGrandezza(e.target.value)}
							/>
						</Form.Group>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

function getTipologiaAnnuncioOptions(params) {
	if (params["ti"] === "Vendita") {
		return (
			<>
				<option>Vendita</option>
				<option>Affitto</option>
			</>
		);
	} else {
		return (
			<>
				<option>Affitto</option>
				<option>Vendita</option>
			</>
		);
	}
}

function getTipologiaImmobileOptions(params) {
	var tipologie = [
		"Monolocale",
		"Bilocale",
		"Trilocale",
		"Quadrilocale",
		"Appartamento",
		"Villa",
		"Mansarda",
		"Locale",
		"Garage",
	];
	if (typeof params["tp"] === "undefined") {
		tipologie.splice(0, 0, "Tutte le tipologie");
	} else {
		const index = tipologie.indexOf(params["tp"]);
		tipologie.splice(index, 1);
		tipologie.splice(0, 0, params["tp"]);
	}
	return tipologie;
}

export default SearchForm;
