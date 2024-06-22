import React, {useContext, useEffect, useParams} from "react";
import "../../styles/home.css";
import {Context} from "../store/appContext";
import {Link} from "react-router-dom";


export const Home = () => {
	const {store, actions} = useContext(Context);
	
	useEffect(() => {
		actions.getCharacters()
	}, []);

	return(

	<div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
		<div className="carousel-inner">
			{store.characters.map((item, index ) => {
				return (
						<div className={"card"} style={{width: "18rem"}} key={item.uid}>
							<img src={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`} className="card-img-top" alt="..."/>
							<div className="card-body">
								<h5 className="card-title">{item.name}</h5>
								<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								<Link to={`./characters/${item.uid}`}  className="btn btn-success">Go somewhere</Link>
							</div>
						</div>
				)
			})}
		</div>
	</div>
	)
};
