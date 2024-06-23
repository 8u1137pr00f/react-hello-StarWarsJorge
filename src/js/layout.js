import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";


import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";

import { VehiclesDetails } from "./views/vehiclesDetails";
import { CharactersDetails } from "./views/charactersDetails";
import { PlanetsDetails } from "./views/planetsDetails";


//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/vehicles/:id" element={<VehiclesDetails />} />
						<Route path="/characters/:id" element={<CharactersDetails />} />
						<Route path="/planets/:id" element={<PlanetsDetails />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					<footer className="footer mt-auto py-3 text-center">
						<span>
							Made by <strong>Jorge Astorga</strong>. May the force be with you.
						</span>
					</footer>	
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
