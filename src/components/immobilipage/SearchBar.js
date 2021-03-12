import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as immobiliActions from "../../redux/actions/immobiliActions";
import SearchForm from "./SearchForm";

/**
 * Classe deputata alla gestione della searchbar e al dispatch delle ricerche
 */
class SearchBar extends React.Component {
	/**
	 * Nel caso non sia presente una visualizzazione nello stato(accesso diretto alla pagina),
	 * effettua il dispatch di ricerca con parametro "Vendita"
	 */
	componentDidMount() {
		if (Object.keys(this.props.visualizzazione.params).length === 0) {
			var parameters = {};
			parameters.ti = "Vendita";
			this.props.actions.ricerca(parameters);
		}
	}

	/**
	 * listener della form
	 * effettua il dispatch della action ricerca
	 * @param {*} event
	 */
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
