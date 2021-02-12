import React from "react";
import { connect } from "react-redux";
import * as immobiliActions from "../../redux/actions/immobiliActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Spinner from "./spinner/Spinner";
import CardsViewer from "../homepage/CardsViewer";
import CardsCarousel from "../aboutuspage/CardsCarousel";

class ImmobiliSection extends React.Component {
	componentDidMount() {
		const { immobili, actions } = this.props;
		if (immobili.length === 0) {
			actions.loadImmobiliHomepage().catch((error) => {
				alert("Caricamento fallito" + error);
			});
		}
	}

	render() {
		return (
			<>
				{this.props.immobili.length === 0 ? (
					<Spinner />
				) : (
					<>
						{this.props.homepage ? (
							<CardsViewer immobili={this.props.immobili} />
						) : (
							<CardsCarousel immobili={this.props.immobili} />
						)}
					</>
				)}
			</>
		);
	}
}

ImmobiliSection.propTypes = {
	immobili: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	homepage: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
	return {
		immobili: state.immobili,
		loading: state.apiCallsinProgress > 0,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			loadImmobiliHomepage: bindActionCreators(
				immobiliActions.loadImmobiliHomepage,
				dispatch
			),
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ImmobiliSection);
