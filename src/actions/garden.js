const { BASE_URL } = require('../config');

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
				dispatch(fetchGarden(foundGarden[0].id));
				dispatch(toggleGardenBoolean());
			}

		})
		.catch(err => dispatch(gardenNameError(err)));
}

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
	console.log(plot);
	return fetch(`${BASE_URL}/api/plots/${plot.id}`, {
		method: 'PUT',
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

export const TOGGLE_GARDEN_BOOLEAN = 'TOGGLE_GARDEN_BOOLEAN';
export const toggleGardenBoolean = () => ({
	type: TOGGLE_GARDEN_BOOLEAN
});

// export const SUBMIT_GARDEN_NAME = 'SUBMIT_GARDEN_NAME';
// export const submitGardenName = (res) => ({
// 	type: SUBMIT_GARDEN_NAME,
// 	res
// });

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

/**	USER ACTIONS **/
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

// export const SET_PLOT_CLICK = 'SET_PLOT_CLICK';
// export const setPlotClick = (plotId) => ({
// 	type: SET_PLOT_CLICK,
// 	plotId
// })