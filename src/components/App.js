import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./homepage/HomePage";
import Header from "./common/Header";
import Footer from "./common/Footer";
import AboutUsPage from "./aboutuspage/AboutUsPage";
import LoginPage from "./loginpage/LoginPage";
import ProfilePage from "./profilepage/ProfilePage";
import RegistrationPage from "./registrationpage/RegistrationPage";
import ImmobiliPage from "./immobilipage/ImmobiliPage";
import ImmobilePage from "./immobilePage/ImmobilePage";
import "../css/style.css";
import "../css/theme.css";

function App() {
	return (
		<div className="container-fluid">
			<Header />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/about" component={AboutUsPage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/profile" component={ProfilePage} />
				<Route path="/registration" component={RegistrationPage} />
				<Route path="/immobili" component={ImmobiliPage} />
				<Route path="/immobile/:id" component={ImmobilePage} />
				<Route component={HomePage} />
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
