import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as immobiliActions from "../../redux/actions/immobiliActions";
import { Redirect } from "react-router-dom";

class SearchButtonSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = { redirect: false };
	}

	handleClick = (type) => {
		var parameters = {};
		parameters.ti = type;
		this.props.actions.ricerca(parameters);
	};

	componentDidUpdate(prevProps) {
		if (prevProps.visualizzazione !== this.props.visualizzazione.params) {
			this.setState({ redirect: true });
		}
	}

	render() {
		if (this.state.redirect === false) {
			return (
				<Container fluid>
					<Row>TROVA L'IMMOBILE IN VENDITA GIUSTO PER TE</Row>
					<Row>
						<Button onClick={() => this.handleClick("Vendita")}>
							IMMOBILI IN VENDITA
						</Button>
					</Row>
					<Row>TROVA L'IMMOBILE IN AFFITTO GIUSTO PER TE</Row>
					<Row>
						<Button onClick={this.handleClick.bind("Affitto")}>
							IMMOBILI IN AFFITTO
						</Button>
					</Row>
				</Container>
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
