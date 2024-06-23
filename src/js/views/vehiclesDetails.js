import React, {useContext, useEffect}from "react";
import { useParams } from "react-router";
import {Context} from "../store/appContext";


import "../../styles/home.css";
import { Link } from "react-router-dom";


export const VehiclesDetails = () => {
	const {store, actions} = useContext(Context)
	const {id} = useParams()

	useEffect(() => {
		actions.getVehiclesDetails(id)
	}, []);

	return(

		<div className="d-flex justify-content-center">
		<div className="card" style={{width: "18rem"}}>
			<img src={`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`} className="card-img-top" alt="..."/>
			<div className="card-body">
				<p className="card-text">Common name: {store.vehiclesDetails.name}</p>
				<p className="card-text">Official model: {store.vehiclesDetails.model}</p>
				<p className="card-text">Vehicle class: {store.vehiclesDetails.vehicle_class}</p>
				<p className="card-text">Manufacturer: {store.vehiclesDetails.manufacturer}</p>
				<p className="card-text">Length: {store.vehiclesDetails.length} meters</p>
				<p className="card-text">Cargo capacity: {store.vehiclesDetails.cargo_capacity} kg</p>
				<p className="card-text">Essential crew: {store.vehiclesDetails.crew}</p>
				<p className="card-text">Passenger capacity: {store.vehiclesDetails.passengers}</p>
				<p className="card-text">Time of consumable support without resuply: {store.vehiclesDetails.consumables} months</p>
				<Link to="/" className="btn btn-success">Go back</Link>
			</div>
		</div>
	</div>
)};
