import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as immobiliActions from "../../redux/actions/immobiliActions";
import CardImmobile from "../common/CardImmobile";
import PageHandler from "./PageHandler";

/**
 * Effettua il rendering della sezione immobili della immobili page
 */
class ImmobiliViewer extends React.Component {
	state = { page: 1 };

	/**
	 * Effettua il dispatch della action loadImmobiliById
	 */
	componentDidMount() {
		this.props.actions.loadImmobiliById(
			this.props.visualizzazione,
			this.state.page,
			this.props.immobili
		);
	}

	/**
	 * Nel caso in cui la visualizzazione sia cambiata,
	 * Imposta la pagina corrente a 1 ed effettua il dispatch di loadImmobiliById
	 * @param {*} prevProps
	 */
	componentDidUpdate(prevProps) {
		if (this.props.visualizzazione !== prevProps.visualizzazione) {
			this.setState({ page: 1 });
			this.props.actions.loadImmobiliById(
				this.props.visualizzazione,
				this.state.page,
				this.props.immobili
			);
		}
	}

	/**
	 *
	 * @param {*} ids gli id degli immobili da visualizzare
	 * @param {*} immobili gli immobili dello stato
	 * @returns un array degli immobili da visualizzare
	 */
	getImmobiliPage(ids, immobili) {
		var toReturn = [];
		for (let i = 0; i < ids.length; i++) {
			for (let j = 0; j < Object.entries(immobili).length; j++) {
				if (immobili[j].id === ids[i]) {
					toReturn.push(immobili[j]);
				}
			}
		}
		return toReturn;
	}

	/**
	 *
	 * @returns gli id degli immobili da visualizzare nella pagina attuale
	 */
	idsToRender() {
		const index = (this.state.page - 1) * 9;
		return this.props.visualizzazione.ids.slice(index, index + 9);
	}

	/**
	 *
	 * @returns gli immobili da visualizzare
	 */
	immobiliToRender() {
		return this.getImmobiliPage(this.idsToRender(), this.props.immobili);
	}

	/**
	 *
	 * @returns un booleano che indica che tutti gli immobili da visualizzare sono presenti nello stato
	 */
	canIRender() {
		return (
			this.immobiliToRender().length < 9 &&
			this.idsToRender().length !== this.immobiliToRender().length
		);
	}

	/**
	 * listener del PageHandler
	 * Cambia la pagina nello stato e richiede gli immobili della nuova page
	 * @param {*} newPage pagina cliccata
	 */
	handlePageChange(newPage) {
		this.setState({ page: newPage });
		this.props.actions.loadImmobiliById(
			this.props.visualizzazione,
			newPage,
			this.props.immobili
		);
	}

	render() {
		if (this.canIRender()) {
			return <Spinner animation="border" variant="primary" />;
		} else {
			return (
				<Container fluid>
					<Row>
						{Object.keys(this.immobiliToRender()).map((key) => (
							<Col md="4">
								<CardImmobile
									immobile={this.immobiliToRender()[key]}
									key={this.immobiliToRender()[key].id}
								/>
							</Col>
						))}
					</Row>
					<Row>
						<PageHandler
							active={this.state.page}
							pages={Math.ceil(
								this.props.visualizzazione.ids.length / 9
							)}
							onClick={this.handlePageChange.bind(this)}
						/>
					</Row>
				</Container>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		visualizzazione: state.visualizzazione,
		immobili: state.immobili,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			loadImmobiliById: bindActionCreators(
				immobiliActions.loadImmobiliById,
				dispatch
			),
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ImmobiliViewer);
