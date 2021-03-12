import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as immobiliActions from "../../../redux/actions/immobiliActions";
import { Button, Container, Row } from "react-bootstrap";
import {
	getStartDate,
	getEndDate,
	shiftDateWeek,
} from "../../../utils/dateUtils";
import { getAppuntamentiLiberi } from "../../../api/immobiliApi";
import PrenotationCalendar from "./PrenotationCalendar";

/**
 * Si occupa della prenotazione degli appuntamenti dell'utente
 */
class CalendarSection extends React.Component {
	/**
	 * Inizializza lo stato con i parametri:
	 *  appuntamenti: l'array degli appuntamenti prenotabili
	 *  show: booleano che indica se mostrare il calendario
	 *  start: data di inizio della settimana visualizzata
	 *  end: data di fine della settimana visualizzata
	 *  prenotato: booleano che indica se sia stata effettuata una prenotazione
	 * @param {*} props
	 */
	constructor(props) {
		super(props);
		this.state = {
			appuntamenti: [],
			show: false,
			start: getStartDate(),
			end: getEndDate(),
			prenotato: false,
		};
	}

	/**
	 * Converte l'oggetto appuntamenti ricevuto tramite la chiamata alle API in array
	 * Aggiunge gli appuntamenti, start e end allo stato
	 * @param {*} start
	 * @param {*} end
	 */
	getAppuntamenti(start, end) {
		getAppuntamentiLiberi(this.props.token, this.props.id, start, end).then(
			(response) => {
				var array = [];
				Object.keys(response).map((key) => array.push(response[key]));
				this.setState({ appuntamenti: array, start: start, end: end });
			}
		);
	}

	/**
	 * ritorna true se ci sono appuntamenti per l'utente
	 * @param {*} prevProps
	 * @returns un booleano
	 */
	canCheckForUpdates(prevProps) {
		return (
			this.props.user !== "undefined" &&
			this.props.user.appuntamenti !== "undefined" &&
			prevProps.user !== "undefined" &&
			prevProps.user.appuntamenti !== "undefined"
		);
	}

	/**
	 * listener del Button iniziale
	 */
	onClickButton = () => {
		if (this.state.show === false) {
			this.getAppuntamenti(this.state.start, this.state.end);
			this.setState({ show: true });
		} else this.setState({ show: false });
	};

	/**
	 * listener dei pulsant prev e next del calendario
	 * @param {*} prev
	 */
	onClickChangeWeek = (prev) => {
		const newStart = shiftDateWeek(prev, this.state.start);
		const newEnd = shiftDateWeek(prev, this.state.end);
		this.getAppuntamenti(newStart, newEnd);
	};

	/**
	 * listener del pulasante today del calendario
	 */
	onClickToday = () => {
		this.setState({ start: getStartDate(), end: getEndDate() });
	};

	/**
	 * listener degli appuntamenti del calendario
	 * il click comporta il dispatch della action prenotaAppuntamento
	 * @param {*} app l'appuntamento cliccato
	 */
	onClickEvent = (app) => {
		this.props.actions.prenotaAppuntamento(
			this.props.token,
			app,
			this.state.start,
			this.state.end
		);
	};

	/**
	 * in caso la prenotazione sia andata a buon fine, modifica il campo prenotato dello stato
	 * @param {*} prevProps
	 */
	componentDidUpdate(prevProps) {
		if (this.canCheckForUpdates(prevProps)) {
			if (
				!this.state.prenotato &&
				this.props.user.appuntamenti.length !==
					prevProps.user.appuntamenti.length
			) {
				this.setState({ prenotato: true });
			}
		}
	}

	render() {
		return (
			<Container fluid>
				<Row>
					<Button
						disabled={
							this.props.token === "undefined" ||
							this.state.prenotato === true
						}
						onClick={this.onClickButton.bind(this)}
						bsPrefix="def-btn"
					>
						PRENOTA UN APPUNTAMENTO
					</Button>
				</Row>
				<Row>
					{this.props.token === "undefined" ? (
						<h5>Effettua il login per prenotare un appuntamento</h5>
					) : (
						<></>
					)}
					{this.state.show === true &&
					this.state.prenotato === false ? (
						<PrenotationCalendar
							changeWeek={this.onClickChangeWeek}
							today={this.onClickToday}
							start={this.state.start}
							app={this.state.appuntamenti}
							onClick={this.onClickEvent}
						/>
					) : (
						<></>
					)}
					{this.state.prenotato === true ? (
						<h5>PRENOTAZIONE EFFETTUATA CON SUCCESSO</h5>
					) : (
						<></>
					)}
				</Row>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		token: state.token,
		user: state.user,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			prenotaAppuntamento: bindActionCreators(
				immobiliActions.prenotaAppuntamento,
				dispatch
			),
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarSection);
