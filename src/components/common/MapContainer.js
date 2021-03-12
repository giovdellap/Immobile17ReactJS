import React from "react";
import Geocode from "react-geocode";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

/**
 * Effettua il rendering dell'applet di Google Maps
 * @param props.nomeImmobile nome dell'immobile
 * @param props.indirizzo indirizzo dell'immobile
 */
export class MapContainer extends React.Component {
	/**
	 * Inserisce nello stato del componente i parametri latitudine, longitudine e geocode
	 * @param {*} props
	 */
	constructor(props) {
		super(props);
		this.state = { lat: 56.9496, lng: 24.1052, geocode: false };
	}

	containerStyle = {
		width: "100%",
		height: "400px",
		margin: "10px 0 5px 10px",
		display: "inline",
	};

	/**
	 * Se il parametro geocode risulta falso,
	 * effettua il geocoding dell'indirizzo e aggiorna lo stato
	 */
	componentDidMount() {
		if (this.state.geocode === false) {
			Geocode.setApiKey("AIzaSyBsKBFy70Mv9pah4QrR39P8xzBbWQThDIU");
			Geocode.setLanguage("it");
			Geocode.setRegion("it");
			Geocode.setLocationType("ROOFTOP");
			Geocode.fromAddress(this.props.indirizzo).then(
				(response) => {
					const { lat, lng } = response.results[0].geometry.location;
					this.setState({ lat: lat, lng: lng, geocode: true });
				},
				(error) => {
					console.error(error);
				}
			);
		}
	}

	render() {
		return (
			<Map
				google={this.props.google}
				zoom={15}
				center={this.state}
				containerStyle={this.containerStyle}
			>
				<Marker name={this.props.nomeImmobile} position={this.state} />
			</Map>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyBsKBFy70Mv9pah4QrR39P8xzBbWQThDIU",
})(MapContainer);
