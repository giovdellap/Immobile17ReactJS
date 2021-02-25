import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as immobiliActions from "../../redux/actions/immobiliActions";
import { Form, Row, Col } from "react-bootstrap";
import SearchForm from "./SearchForm";

class SearchBar extends React.Component {
	componentDidMount() {
		if (Object.keys(this.props.visualizzazione.params).length === 0) {
			var parameters = {};
			parameters.ti = "Vendita";
			this.props.actions.ricerca(parameters);
		}
	}

	componentDidUpdate() {}

	handleSubmit = (event) => {
		event.preventDefault();
		var parameters = {};
		const formData = new FormData(event.target);
		for (var pair of formData.entries()) {
			if (
				!(
					(pair[0] === "pc" && pair[1] === "") ||
					(pair[0] === "tp" && pair[1] === "Tutte le tipologie")
				)
			) {
				parameters[pair[0]] = pair[1];
			}
		}
		this.props.actions.ricerca(parameters);
	};

	render() {
		console.log("PROVA: " + this.props.visualizzazione);
		return (
			<SearchForm
				onSubmit={this.handleSubmit}
				parameters={this.props.visualizzazione.params}
			/>
		);
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
