import { getAllVeggies } from './veggie';

const BASE_URL = 'https://gardening-server.herokuapp.com';

export const createGarden = (garden) => dispatch => {
	dispatch(fetchPlotsRequest());
	// console.log(garden);
	return fetch(`${BASE_URL}/api/gardens/`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(garden)
	})
	.then(res => {
		// console.log(res);
		res.json();
	})
	.then(garden => dispatch(fetchPlotsSuccess(garden)))
	.then(() => dispatch(getAllVeggies()))
	.catch(err => dispatch(fetchPlotsError(err)));
}
export const fetchGarden = (id) => dispatch => {
	// update state to reflect a request for a garden w/ given id
	dispatch(fetchPlotsRequest());
	// make the api call and handle the response
	return fetch(`${BASE_URL}/api/gardens/${id}`, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(garden => dispatch(fetchPlotsSuccess(garden)))
		.catch(err => dispatch(fetchPlotsError(err)));
}
// Find a garden that matches a given name
export const findGarden = (name) => dispatch => {
	return fetch(`${BASE_URL}/api/gardens`)
		.then(res => res.json())
		.then(gardens => {
			// filter all gardens on the given name (should be length 1 max is name is unique)
			const foundGarden = gardens.filter(garden => {
				return (garden.name.toLowerCase() === name.toLowerCase());
			});
			if(foundGarden[0]) {
				// console.log(foundGarden[0]);
				dispatch(fetchPlotsSuccess(foundGarden[0]));
				// dispatch(toggleGardenBoolean());
			}

		})
		.catch(err => dispatch(gardenNameError(err)));
}
export const deleteGarden = (gardenId) => dispatch => {
	return fetch(`${BASE_URL}/api/gardens/${gardenId}`, {
		method: 'DELETE'
	})
	.then(res => {
		if(res.ok) {
			dispatch(deleteGardenSuccess());
		} else {
			return Promise.reject("delete garden unsuccessful");
		}
	})
	.catch(err => dispatch(fetchPlotsError(err)));
}

export const DELETE_GARDEN_SUCCESS = 'DELETE_GARDEN_SUCCESS';
export const deleteGardenSuccess = () => ({
	type: DELETE_GARDEN_SUCCESS
});

export const FETCH_PLOTS_REQUEST = 'FETCH_PLOTS_REQUEST';
export const fetchPlotsRequest = () => ({
	type: FETCH_PLOTS_REQUEST
});

export const FETCH_PLOTS_SUCCESS = 'FETCH_PLOTS_SUCCESS';
export const fetchPlotsSuccess = (res) => ({
	type: FETCH_PLOTS_SUCCESS,
	res
});
export const FETCH_PLOTS_ERROR = 'FETCH_PLOTS_ERROR';
export const fetchPlotsError = (err) => ({
	type: FETCH_PLOTS_ERROR,
	err
});
export const TOGGLE_GARDEN_BOOLEAN = 'TOGGLE_GARDEN_BOOLEAN';
export const toggleGardenBoolean = (res) => ({
	type: TOGGLE_GARDEN_BOOLEAN
});

export const SUBMIT_GARDEN = 'SUBMIT_GARDEN';
export const submitGarden = (res) => ({
	type: SUBMIT_GARDEN,
	res
});
export const GARDEN_NAME_ERROR = 'GARDEN_NAME_ERROR';
export const gardenNameError = (err) => ({
	type: GARDEN_NAME_ERROR,
	err: err.message
});