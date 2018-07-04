// import const { BASE_URL } from '../config';

export const FETCH_PLOTS = 'FETCH_PLOTS';

export const fetchPlots = () => dispatch => (
	dispatch(fetchPlotsRequest()))
		// .then(() => fetch(`${BASE_URL}/api/plots`, {
		.then(() => fetch(`localhost:8080/api/plots`, {
			method: 'GET'
		}))
		.then(res => res.json())
		.then(res => dispatch(fetchPlotsSuccess(res)))
		.catch(err => dispatch(fetchPlotsError(err)));

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