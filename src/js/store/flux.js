const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            characters: [],
            characterDetails: [],
            vehicles: [],
            vehiclesDetails: [],
            planets: [],
            planetsDetails: [],
            favorites: []
        },

        actions: {
            getCharacters : async() => {
                const res = await fetch(`https://www.swapi.tech/api/people/`)
                const data = await res.json()
                setStore({characters: data.results})
            },
            getCharactersDetails: async(id) => {
                const result = await fetch(`https://www.swapi.tech/api/people/${id}`)
                const data = await result.json()
                console.log(data.result.properties);
                setStore({characterDetails: data.result.properties})
            },
            getVehicles : async() => {
                const res = await fetch(`https://www.swapi.tech/api/vehicles/`)
                const data = await res.json()
                setStore({vehicles: data.results})
            },
            getVehiclesDetails: async(id) => {
                const result = await fetch(`https://www.swapi.tech/api/vehicles/${id}`)
                const data = await result.json()
                console.log(data.result.properties);
                setStore({vehiclesDetails: data.result.properties})
            },
            getPlanets : async() => {
                const res = await fetch(`https://www.swapi.tech/api/planets/`)
                const data = await res.json()
                setStore({planets: data.results})
            },
            getPlanetsDetails: async(id) => {
                const result = await fetch(`https://www.swapi.tech/api/planets/${id}`)
                const data = await result.json()
                console.log(data.result.properties);
                setStore({planetsDetails: data.result.properties})
            },

            //a partir de aquí es para manejar los favoritos
            toggleFavorite: (item) => {
                const store = getStore();
                const favorites = store.favorites;
                const index = favorites.findIndex(fav => fav.uid === item.uid);

                if (index === -1) {
                    // Add
                    setStore({ favorites: [...favorites, item] });
                } else {
                    // Remove
                    const updatedFavorites = favorites.filter(fav => fav.uid !== item.uid);
                    setStore({ favorites: updatedFavorites });
                }
            },
            removeFavorite: (uid) => {
                const store = getStore();
                const updatedFavorites = store.favorites.filter(favorite => favorite.uid !== uid);
                setStore({ favorites: updatedFavorites });
            }
        }
    };
};

export default getState;
