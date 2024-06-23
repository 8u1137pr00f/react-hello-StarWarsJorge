import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [validCharacters, setValidCharacters] = useState([]);
    const [validVehicles, setValidVehicles] = useState([]);
    const [validPlanets, setValidPlanets] = useState([]);

    useEffect(() => {
        const loadCharacters = async () => {
            await actions.getCharacters();
            const validChars = await Promise.all(
                store.characters.map(async (item) => {
                    const isValid = await checkImageURL(`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`);
                    return isValid ? item : null;
                })
            );
            setValidCharacters(validChars.filter(Boolean));
        };

        const loadVehicles = async () => {
            await actions.getVehicles();
            const validVehs = await Promise.all(
                store.vehicles.map(async (item) => {
                    const isValid = await checkImageURL(`https://starwars-visualguide.com/assets/img/vehicles/${item.uid}.jpg`);
                    return isValid ? item : null;
                })
            );
            setValidVehicles(validVehs.filter(Boolean));
        };

        const loadPlanets = async () => {
            await actions.getPlanets();
            const validPlts = await Promise.all(
                store.planets.map(async (item) => {
                    const isValid = await checkImageURL(`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`);
                    return isValid ? item : null;
                })
            );
            setValidPlanets(validPlts.filter(Boolean));
        };

        loadCharacters();
        loadVehicles();
        loadPlanets();
    }, [actions, store.characters, store.vehicles, store.planets]);

    const createCarouselItems = (items, type) => {
        const slides = [];
        for (let i = 0; i < items.length; i += 4) {
            const chunk = items.slice(i, i + 4);
            slides.push(
                <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={`slide-${type}-${i}`}>
                    <div className="row justify-content-center">
                        {chunk.map((item) => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.uid}>
                                <div className="card mx-2 mb-4" style={{ width: "100%" }}>
                                    <img
                                        src={`https://starwars-visualguide.com/assets/img/${type}/${item.uid}.jpg`}
                                        className="card-img-top"
                                        alt={item.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
										<div className="d-flex justify-content-between">
											<Link to={`./${type}/${item.uid}`} className="btn btn-outline-dark">
												Learn more!
											</Link>
											<button
												className={`btn ms-2 ${store.favorites.some(fav => fav.uid === item.uid) ? 'btn-success' : 'btn-dark'}`}
												onClick={() => actions.toggleFavorite({ ...item, type })}>
												<i className="fas fa-globe"></i> +
											</button>
										</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return slides;
    };

    return (
        <div className="container">
            <h2 className="text-center">Characters</h2>
            <div id="charactersCarousel" className="carousel slide" data-bs-ride="true" data-bs-interval="5000">
                <div className="carousel-inner">
                    {createCarouselItems(validCharacters, "characters")}
                </div>
                <button className="carousel-control-prev custom-carousel-control position-absolute top-50" type="button" data-bs-target="#charactersCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon custom-carousel-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next custom-carousel-control position-absolute top-50" type="button" data-bs-target="#charactersCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon custom-carousel-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <h2 className="text-center">Vehicles</h2>
            <div id="vehiclesCarousel" className="carousel slide" data-bs-ride="true" data-bs-interval="5000">
                <div className="carousel-inner">
                    {createCarouselItems(validVehicles, "vehicles")}
                </div>
                <button className="carousel-control-prev custom-carousel-control position-absolute top-50" type="button" data-bs-target="#vehiclesCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon custom-carousel-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next custom-carousel-control position-absolute top-50" type="button" data-bs-target="#vehiclesCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon custom-carousel-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <h2 className="text-center">Planets</h2>
            <div id="planetsCarousel" className="carousel slide" data-bs-ride="true" data-bs-interval="5000">
                <div className="carousel-inner">
                    {createCarouselItems(validPlanets, "planets")}
                </div>
                <button className="carousel-control-prev custom-carousel-control position-absolute top-50" type="button" data-bs-target="#planetsCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon custom-carousel-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next custom-carousel-control position-absolute top-50" type="button" data-bs-target="#planetsCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon custom-carousel-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};
//añado el checkImageURL porque la imagen 1 del planeta tatooine está caída en el server de la api
//entonces mi .map me renderiza una card sin imagen y no luce bien.
//de esta forma me aseguro que se renderize la card siempre y cuando haya una imagen que ponerle :)
const checkImageURL = async (url) => {
    try {
        const response = await fetch(url);
        return response.ok;
    } catch (error) {
        return false;
    }
};
