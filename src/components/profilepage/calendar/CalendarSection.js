import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, Container, Row } from "react-bootstrap";
import * as userActions from "../../../redux/actions/userActions";
import * as immobiliActions from "../../../redux/actions/immobiliActions";
import { getAppuntamentoFromId } from "../../../utils/calendarUtils";
import PersonalCalendar from "./PersonalCalendar";
import AppointmentCard from "./AppointmentCard";

/**
 * Classe per la visualizzazione del calendario utente e della scheda appuntamento
 */
class CalendarSection extends React.Component {
	states = {
		NONE: "NONE",
		CALENDAR: "CALENDAR",
		SCHEDA: "SCHEDA",
	};

	/**
	 * Lo stato viene inizializzato con due parametri:
	 *  - show: booleano inizializzato a NONE
	 *  - id: l'id dell'appuntamento da visualizzare
	 * @param {*} props
	 */
	constructor(props) {
		super(props);
		this.state = { show: this.states.NONE, id: "" };
	}

	/**
	 * Effettua il dispatch della action getAppuntamenti
	 */
	componentDidMount() {
		this.props.actions.getAppuntamenti(this.props.user, this.props.token);
	}

	/**
	 *
	 * @returns un boolenano che indica se l'utente è un cliente o un agente immobiliare
	 */
	isCliente() {
		return this.props.user.email.slice(-7) === "info.it";
	}

	/**
	 *
	 * @returns un booleano che indica se l'array appuntamenti dell'utente è vuoto
	 */
	appointmentsNotEmpty() {
		return this.props.user.appuntamenti !== "undefined";
	}

	/**
	 * Cointrolla che l'immobile dell'appuntamento scelto non sia presente nello stato
	 * In caso positivo, effettua il dispatch della action loadImmobile per aggiungerlo allo stato
	 * @param {*} appId
	 */
	loadImmobileIfNeeded(appId) {
		const immobile = getAppuntamentoFromId(
			appId,
			this.props.user.appuntamenti
		).immobile;

		if (typeof this.props.immobili === "undefined") {
			this.props.actions.loadImmobile(immobile);
		} else {
			var ids = [];
			for (let i = 0; i < this.props.immobili.length; i++) {
				ids.push(this.props.immobili[i].id);
			}
			if (!ids.includes(immobile)) {
				this.props.actions.loadImmobile(immobile);
			}
		}
	}

	/**
	 *
	 * @returns il render della scheda appuntamento
	 */
	getAppointmentCard() {
		return this.props.user.appuntamenti.map((appuntamento) => {
			if (appuntamento.id === this.state.id) {
				return this.props.immobili.map((immobile) => {
					if (immobile.id === appuntamento.immobile) {
						return (
							<Container>
								<Row>
									<Button
										variant="default"
										bsPrefix="def-btn profile-page-btn"
										onClick={this.onClickButton}
									>
										TORNA AL CALENDARIO
									</Button>
								</Row>
								<Row>
									<AppointmentCard
										immobile={immobile}
										appuntamento={appuntamento}
										cliente={this.isCliente}
									/>
								</Row>
							</Container>
						);
					}
				});
			}
		});
	}

	/**
	 * listener del bottone principale
	 * Cambia state.show
	 */
	onClickButton = () => {
		switch (this.state.show) {
			case this.states.NONE:
				this.setState({ show: this.states.CALENDAR });
				break;
			case this.states.CALENDAR:
				this.setState({ show: this.states.NONE });
				break;
			case this.states.SCHEDA:
				this.setState({ show: this.states.CALENDAR });
				break;
			default:
				console.log("KAMCHATKA");
		}
	};

	/**
	 * listener degli appuntamenti
	 * @param {*} id id dell'appuntamento
	 */
	onClickAppuntamento = (id) => {
		this.loadImmobileIfNeeded(id);
		this.setState({ show: this.states.SCHEDA, id: id });
	};

	render() {
		switch (this.state.show) {
			case this.states.NONE:
				if (this.appointmentsNotEmpty()) {
					return (
						<Button
							variant="default"
							bsPrefix="def-btn profile-page-btn"
							onClick={this.onClickButton}
						>
							VISUALIZZA APPUNTAMENTI
						</Button>
					);
				} else {
					return (
						<Container>
							<Row>
								<Button
									variant="default"
									bsPrefix="def-btn profile-page-btn"
									disabled
								>
									VISUALIZZA APPUNTAMENTI
								</Button>
							</Row>
							<Row>Non hai appuntamenti da visualizzare</Row>
						</Container>
					);
				}
			case this.states.CALENDAR:
				return (
					<Container>
						<Row>
							<Button
								variant="default"
								bsPrefix="def-btn profile-page-btn"
								onClick={this.onClickButton}
							>
								VISUALIZZA APPUNTAMENTI
							</Button>
						</Row>
						<Row>
							<div className="personal-calendar">
								<PersonalCalendar
									appuntamenti={this.props.user.appuntamenti}
									onClick={this.onClickAppuntamento}
								/>
							</div>
						</Row>
					</Container>
				);
			case this.states.SCHEDA:
				return this.getAppointmentCard();

			default:
				return <></>;
		}
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
		token: state.token,
		immobili: state.immobili,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			getAppuntamenti: bindActionCreators(
				userActions.getAppuntamenti,
				dispatch
			),

			loadImmobile: bindActionCreators(
				immobiliActions.loadImmobile,
				dispatch
			),
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarSection);
