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
		console.log("UNO: " + Object.entries(this.props.user).length !== 0);
		console.log("DUE: " + this.props.user.appuntamenti);
		console.log("TRE: " + Object.entries(prevProps.user).length !== 0);
		console.log("QUATTRO: " + prevProps.user.appuntamenti);
		return (
			Object.entries(this.props.user).length !== 0 &&
			Object.entries(prevProps.user).length !== 0
		);
	}

	loginOK() {
		console.log("CATAFRATTOMI " + Object.entries(this.props.user).length);
		return Object.entries(this.props.user).length !== 0;
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
					<div className="calendar-button-row">
						<Button
							disabled={
								!this.loginOK() || this.state.prenotato === true
									? true
									: false
							}
							onClick={this.onClickButton.bind(this)}
							bsPrefix="def-btn"
						>
							PRENOTA UN APPUNTAMENTO
						</Button>
					</div>
				</Row>
				<Row>
					{!this.loginOK() ? (
						<h5>
							<div className="error-string">
								Effettua il login per prenotare un appuntamento
							</div>
						</h5>
					) : (
						<></>
					)}
					{this.state.show === true &&
					this.state.prenotato === false &&
					this.loginOK() ? (
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
						<div className="prenotation-ok">
							<h2>PRENOTAZIONE EFFETTUATA CON SUCCESSO</h2>
						</div>
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
