import React from "react";
import { Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as immobiliActions from "../../redux/actions/immobiliActions";
import ImmobileView from "./ImmobileView";

/**
 * classe per il rendering della immobile page
 */
class ImmobilePage extends React.Component {
	/**
	 *
	 * @returns bolleano che indica se l'immobili è presente nello stato
	 */
	isImmobileinState() {
		var toReturn = false;
		Object.keys(this.props.immobili).map((key) => {
			if (this.props.immobili[key].id === this.props.id) {
				toReturn = true;
			}
		});
		return toReturn;
	}

	/**
	 * Se il campo error dello stato è vuoto e l'immobile non è presente,
	 * Effettua il dispatch della action loadImmobile
	 */
	componentDidMount() {
		if (
			this.props.error !== "IMMOBILE NON PRESENTE" &&
			!this.isImmobileinState()
		) {
			this.props.actions.loadImmobile(this.props.id);
		}
	}

	render() {
		if (this.props.error === "IMMOBILE NON PRESENTE") {
			return <Redirect to="/homepage" />;
		} else if (!this.isImmobileinState()) {
			return <Spinner variant="warning" />;
		} else {
			var immobile;
			Object.keys(this.props.immobili).map((key) => {
				if (this.props.immobili[key].id === this.props.id) {
					immobile = this.props.immobili[key];
				}
			});
			return <ImmobileView immobile={immobile} />;
		}
	}
}

function mapStateToProps(state, ownProps) {
	return {
		id: ownProps.match.params.id,
		immobili: state.immobili,
		error: state.error,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			loadImmobile: bindActionCreators(
				immobiliActions.loadImmobile,
				dispatch
			),
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ImmobilePage);
