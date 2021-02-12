import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./homepage/HomePage";
import Header from "./common/Header";
import Footer from "./common/Footer";
import AboutUsPage from "./aboutuspage/AboutUsPage";
import PageNotFound from "./PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/css/common.css";

function App() {
	return (
		<div className="container-fluid">
			<Header />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/about" component={AboutUsPage} />
				{/* <Route component={PageNotFound} /> */}
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
