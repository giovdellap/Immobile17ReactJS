import React, { useState } from "react";
import { Form, Row, Col, Button, FormControl } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

const SearchForm = ({ onSubmit, parameters }) => {
	const [prezzo, setPrezzo] = useState(
		parameters.hasOwnProperty("pmax") ? parameters.pmax : 1000000
	);
	const [grandezza, setGrandezza] = useState(
		parameters.hasOwnProperty("gmin") ? parameters.gmin : 2000
	);

	return (
		<Form onSubmit={onSubmit}>
			<Col md="4">
				<Form.Group>
					<Form.Control
						as="input"
						type="text"
						name="pc"
						placeholder="Parola Chiave"
					/>
				</Form.Group>
			</Col>
			<Col md="4">
				<Form.Group>
					<Form.Label>Tipologia Annuncio</Form.Label>
					<Form.Control as="select" name="ti">
						{getTipologiaAnnuncioOptions(parameters)}
					</Form.Control>
				</Form.Group>
			</Col>
			<Col md="4">
				<Form.Group>
					<Form.Label>Tipologia Immobile</Form.Label>
					<Form.Control as="select" name="tp">
						{getTipologiaImmobileOptions(parameters).map(function (
							tipologia
						) {
							return <option>{tipologia}</option>;
						})}
					</Form.Control>
				</Form.Group>
			</Col>
			<Col md="6">
				<Form.Group>
					<Row>
						<Form.Label>Prezzo Massimo: €</Form.Label>
						<Form.Control
							as="input"
							type="text"
							name="pmax"
							value={prezzo}
							onChange={(e) => setPrezzo(e.target.value)}
						/>
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
					<Row>
						<Form.Label>Grandezza Minima: mq</Form.Label>
						<Form.Control
							as="input"
							type="text"
							name="gmin"
							value={grandezza}
							onChange={(e) => setGrandezza(e.target.value)}
						/>
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
			<Col md="6">
				<Button variant="primary" type="submit">
					CERCA
				</Button>
			</Col>
		</Form>
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
