import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, Container, Row } from "react-bootstrap";
import * as userActions from "../../../redux/actions/userActions";
import * as immobiliActions from "../../../redux/actions/immobiliActions";
import PersonalCalendar from "./PersonalCalendar";
import AppointmentCard from "./AppointmentCard";

class CalendarSection extends React.Component {
	states = {
		NONE: "NONE",
		CALENDAR: "CALENDAR",
		SCHEDA: "SCHEDA",
	};

	appointmentsNotEmpty() {
		console.log("VVV: " + this.props.user.appuntamenti);
		return this.props.user.appuntamenti !== "undefined";
	}

	loadImmobileIfNeeded(appId) {
		var immobile = "";
		this.props.user.appuntamenti.map(function (appuntamento) {
			if (appuntamento.id === appId) immobile = appuntamento.immobile;
		});
		console.log("IMM: " + immobile);
		if (typeof this.props.immobili !== "undefined") {
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

	getAppointmentCard() {
		return this.props.appuntamenti.map((appuntamento) => {
			if (appuntamento.id === this.state.id) {
				return this.props.immobili.map((immobile) => {
					if (immobile.id === appuntamento.immobile) {
						return (
							<Container>
								<Row>
									<AppointmentCard
										immobile={immobile}
										appuntamento={appuntamento}
									/>
								</Row>
							</Container>
						);
					}
				});
			}
		});
	}

	constructor(props) {
		super(props);
		this.state = { show: this.states.NONE, id: "" };
	}

	componentDidMount() {
		this.props.actions.getAppuntamenti(this.props.user, this.props.token);
		console.log(typeof this.props.user.appuntamenti);
	}

	onClickButton = () => {
		console.log("onclick stato: " + this.state.show);
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

	onClickAppuntamento = (id) => {
		this.loadImmobileIfNeeded(id);
		this.setState({ show: this.states.SCHEDA, id: id });
	};

	render() {
		console.log("QUIQUOQUA " + this.state);
		switch (this.state.show) {
			case this.states.NONE:
				if (this.appointmentsNotEmpty()) {
					return (
						<Button variant="success" onClick={this.onClickButton}>
							{console.log("GEPPETTO")}
							VISUALIZZA APPUNTAMENTI
						</Button>
					);
				} else {
					return (
						<Container>
							<Row>
								{console.log("PIPPOZZO")}
								<Button variant="secondary" disabled>
									VISUALIZZA APPUNTAMENTI
								</Button>
							</Row>
							<Row>Non hai appuntamenti da visualizzare</Row>
						</Container>
					);
				}
			case this.states.CALENDAR:
				console.log("CCCP");
				return (
					<Container>
						<Row>
							{console.log("UNOOOO")}
							<Button
								variant="success"
								onClick={this.onClickButton}
							>
								VISUALIZZA APPUNTAMENTI
							</Button>
						</Row>
						<Row>
							{console.log(
								"GONEGONE: " + this.props.user.appuntamenti
							)}
							<PersonalCalendar
								appuntamenti={this.props.user.appuntamenti}
								onClick={this.onClickAppuntamento}
							/>
						</Row>
					</Container>
				);
			case this.states.SCHEDA:
				console.log("quiquiqui");
				return this.getAppointmentCard();

			default:
				console.log("STATO ASSASSINO: " + this.state.show);
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
