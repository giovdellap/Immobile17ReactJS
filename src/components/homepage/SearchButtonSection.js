import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as immobiliActions from "../../redux/actions/immobiliActions";
import { Redirect } from "react-router-dom";

/**
 * Effettua il rendering della searchbuttonsection
 * Costruisce una nuova visualizzazione in caso di click
 */
class SearchButtonSection extends React.Component {
	/**
	 * Inizializza lo stato con un booleano redirect settato a false
	 * @param {*} props
	 */
	constructor(props) {
		super(props);
		this.state = { redirect: false };
	}

	/**
	 * listener dei Button
	 * chiama la action Ricerca
	 * @param {*} type
	 */
	handleClick = (type) => {
		var parameters = {};
		parameters.ti = type;
		this.props.actions.ricerca(parameters);
	};

	/**
	 * Nel caso props.visualizzazione cambi modifica state.redirect a true
	 * @param {*} prevProps
	 */
	componentDidUpdate(prevProps) {
		if (prevProps.visualizzazione !== this.props.visualizzazione) {
			this.setState({ redirect: true });
		}
	}

	/**
	 * Se redirect = true, reindirizza alla page immobili
	 * @returns rendering della sezione
	 */
	render() {
		if (this.state.redirect === false) {
			return (
				<div id="search-section">
					<Row>
						<div className="search-section-area">
							<div className="text-on-image">
								<h3>
									TROVA L'IMMOBILE IN VENDITA GIUSTO PER TE
								</h3>
								<p>
									Vuoi trovare una villa immersa nella natura
									per goderti la crescita della tua famiglia?
									<br />
									Stai cercando un monolocale che rifletta il
									tuo stile di vita dinamico?
								</p>
							</div>

							<Button
								variant="default"
								onClick={() => this.handleClick("Vendita")}
								bsPrefix="def-btn search-btn"
							>
								CERCA TRA GLI IMMOBILI IN VENDITA
							</Button>
							<Button
								variant="default"
								onClick={() => this.handleClick("Affitto")}
								bsPrefix="def-btn search-btn"
							>
								CERCA TRA GLI IMMOBILI IN AFFITTO
							</Button>
						</div>
					</Row>
				</div>
			);
		} else {
			return <Redirect to="/immobili" />;
		}
	}
}

function mapStateToProps(state) {
	return {
		visualizzazione: state.visualizzazione,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			ricerca: bindActionCreators(immobiliActions.ricerca, dispatch),
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchButtonSection);
