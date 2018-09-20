// require('dotenv').config();
// const { BASE_URL } = require('../config');
const BASE_URL = 'https://gardening-server.herokuapp.com';

/////////////////////////////////////////////
////// SERVER API CALLS FOR GARDEN REQ //////
/////////////////////////////////////////////
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
/////////////////////////////////////////////
////// SERVER API CALLS FOR PLOT REQ'S //////
/////////////////////////////////////////////
export const createPlot = (plot) => dispatch => {
	return fetch(`${BASE_URL}/api/plots`, {
		method: 'POST',
		headers: {
			"Content-Types": "application/json"
		},
		body: {
			name: plot.name,
			gardenId: plot.gardenId,
			veggies: plot.veggies ? [...plot.veggies] : []
		}
	})
	.then(res => res.json())
	.then(plot => dispatch(createPlotSuccess(plot)))
	.catch(err => dispatch(createPlotError(err)));
}
export const sendEditPlot = (plot) => dispatch => {
	// console.log(plot);
	return fetch(`${BASE_URL}/api/plots/${plot.id}`, {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(plot)
	})
	.then((res) => {
		if(res.ok) {
			return dispatch(editPlotSuccess(plot));
		} else {
			return Promise.reject("editing plot unsuccessful");
		}
	})
	.catch(err => dispatch(createPlotError(err)));
}
/////////////////////////////////////////////
////// SERVER API CALLS FOR VEGGIE REQ'S ////
/////////////////////////////////////////////
// export const fetchVeggie = (veggieId) => dispatch => {
// 	return fetch(`${BASE_URL}/api/veggies/${veggieId}`, { method: 'GET' })
// 		.then(veggie => dispatch(fetchVeggieSuccess(veggie)))
// 		.catch(error => dispatch(fetchVeggie))
// }

export const sendEditVeggie = (veggie) => dispatch => {
	return fetch(`${BASE_URL}/api/veggies/${veggie.id}`, {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(veggie)
	})
	.then((res) => {
		if(res.ok) {
			return dispatch(editVeggieSuccess(veggie));
		} else {
			return Promise.reject("editing veggie unsuccessful");
		}
	})
	.catch(err => dispatch(editVeggieError(err)));
};
/////////////////////////////////////////////
////////  GARDEN ACTIONS  ///////////////////
/////////////////////////////////////////////
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
/////////////////////////////////////////////
////////  VEGGIE ACTIONS  ///////////////////
/////////////////////////////////////////////
// export const editVeggie = (veggie) => dispatch => {
// 	return dispatch(focusVeggie(veggie));
// };

export const FOCUS_VEGGIE = 'FOCUS_VEGGIE';
export const focusVeggie = (veggieFocus) => ({
	type: FOCUS_VEGGIE,
	veggieFocus
});

export const EDIT_VEGGIE_SUCCESS = 'EDIT_VEGGIE_SUCCESS';
export const editVeggieSuccess = (veggie) => ({
	type: EDIT_VEGGIE_SUCCESS,
	veggie
});

export const EDIT_VEGGIE_ERROR = 'EDIT_VEGGIE_ERROR';
export const editVeggieError = (error) => ({
	type: EDIT_VEGGIE_ERROR,
	error
});
/////////////////////////////////////////////
////////  PLOT ACTIONS  /////////////////////
/////////////////////////////////////////////
export const EDIT_PLOT_SUCCESS = 'EDIT_PLOT_SUCCESS';
export const editPlotSuccess = (plot) => ({
	type: EDIT_PLOT_SUCCESS,
	plot
});

export const CREATE_PLOT_SUCCESS = 'CREATE_PLOT_SUCCESS';
export const createPlotSuccess = (plot) => ({
	type: CREATE_PLOT_SUCCESS,
	plot
});

export const CREATE_PLOT_ERROR = 'CREATE_PLOT_ERROR';
export const createPlotError = (error) => ({
	type: CREATE_PLOT_ERROR,
	error
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

export const FOCUS_PLOT = 'FOCUS_PLOT';
export const focusPlot = (plotFocus) => ({
	type: FOCUS_PLOT,
	plotFocus
});

export const EDIT_PLOT = 'EDIT_PLOT';
export const editPlot = () => ({
	type: EDIT_PLOT
});

export const NEW_PLOT = 'NEW_PLOT';
export const newPlot = () => ({
	type: NEW_PLOT
});