const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters: [],
			characterDetails: []
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
			}
		}
		
	};
};

export default getState;
