import React from "react";
import { Link } from "react-router-dom";
import starWarsLogo from "../img/star_wars_logo_PNG28.png"; // Asegúrate de que la ruta sea correcta

export const Navbar = () => {
	return (
		<nav className="navbar p-3 m-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
			<Link to="/">
				<img src={starWarsLogo} alt="Star Wars Logo" style={{ height: "75px" }} className="navbar-brand mb-0 h1" />
			</Link>
			<div className="ml-auto">
				<Link to="/demo">
					<button className="btn btn-primary">Check the Context in action</button>
				</Link>
			</div>
		</nav>
	);
};
