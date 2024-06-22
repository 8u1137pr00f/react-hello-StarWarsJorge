import React, {useContext, useEffect}from "react";
import { useParams } from "react-router";
import {Context} from "../store/appContext";

import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";


export const CharactersDetails = () => {
	const {store, actions} = useContext(Context)
	const {id} = useParams()

	useEffect(() => {
		actions.getCharactersDetails(id)
	}, []);

	return(

	<div className="text-center mt-5">
		<div className="card" style={{width: "18rem"}}>
			<img src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} className="card-img-top" alt="..."/>
			<div className="card-body">
				<p className="card-text">{store.characterDetails.name}</p>
				<p className="card-text">{store.characterDetails.birth_year}</p>
				<p className="card-text">{store.characterDetails.gender}</p>
				<p className="card-text">{store.characterDetails.height}</p>
				<p className="card-text">{store.characterDetails.skin_color}</p>
				<p className="card-text">{store.characterDetails.hair_color}</p>
				<Link to="/" className="btn btn-success">Go back</Link>
			</div>
		</div>
	</div>
)};
