import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as immobiliActions from "../../redux/actions/immobiliActions";
import CardImmobile from "../common/CardImmobile";
import PageHandler from "./PageHandler";

class ImmobiliViewer extends React.Component {
	state = { page: 1 };

	componentDidMount() {
		this.props.actions.loadImmobiliById(
			this.props.visualizzazione,
			this.state.page,
			this.props.immobili
		);
	}

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

	idsToRender() {
		const index = (this.state.page - 1) * 9;
		return this.props.visualizzazione.ids.slice(index, index + 9);
	}

	immobiliToRender() {
		return this.getImmobiliPage(this.idsToRender(), this.props.immobili);
	}

	canIRender() {
		return (
			this.immobiliToRender().length < 9 &&
			this.idsToRender().length !== this.immobiliToRender().length
		);
	}

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
