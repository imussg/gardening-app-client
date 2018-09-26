import { submitGarden } from './garden';

const BASE_URL = 'https://gardening-server.herokuapp.com';

export const createPlot = (plot) => dispatch => {
	dispatch(editPlotRequest());
	return fetch(`${BASE_URL}/api/plots/`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(plot)
	})
	.then(res => fetch(`${BASE_URL}/api/gardens/${plot.gardenId}`))
	.then(res => res.json())
	.then(garden => dispatch(submitGarden(garden)))
	.then(() => dispatch(createPlotSuccess(null)))
	.catch(err => dispatch(createPlotError(err)));
}
export const sendEditPlot = (plot) => dispatch => {
	// console.log(plot);
	dispatch(editPlotRequest());
	return fetch(`${BASE_URL}/api/plots/${plot.id}`, {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(plot)
	})
	.then((res) => {
		if(res.ok) {
			return fetch(`${BASE_URL}/api/plots/${plot.id}`)
			.then(res => res.json())
			.then(plot => {
				// console.log(plot);
				return dispatch(editPlotSuccess(plot));
			})
		} else {
			return Promise.reject("editing plot unsuccessful");
		}
	})
	.catch(err => dispatch(createPlotError(err)));
}

export const EDIT_PLOT_REQUEST = 'EDIT_PLOT_REQUEST';
export const editPlotRequest = () => ({
	type: EDIT_PLOT_REQUEST
});

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

export const CLICKED = 'CLICKED';
export const clicked = () => ({
	type: CLICKED
});