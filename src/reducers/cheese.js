import {
	FETCH_CHEESES,
	FETCH_CHEESES_REQUEST,
	FETCH_CHEESES_SUCCESS,
	FETCH_CHEESES_ERROR,
	fetchCheeses
} from '../actions/cheese';

const initialState = {
	cheeses: [
		"Bath Blue",
		"Barkham Blue",
		"Buxton Blue"
	],
	loading: false,
	error: null
}

export default function reducer(state=initialState, action) {
	if(action.type === FETCH_CHEESES) {
		console.log(action);
		return this.reducer(state, {
			type: FETCH_CHEESES_REQUEST,
			error: null,
			cheeses: []
		});
	} else if(action.type === FETCH_CHEESES_REQUEST) {
		return Object.assign({}, state, {
			loading: true,
			error: null
		});
	} else if(action.type === FETCH_CHEESES_SUCCESS) {
		return Object.assign({}, state, {
			loading:false,
			error: null,
			cheeses: [...action.res]
		});
	} else if(action.type === FETCH_CHEESES_ERROR) {
		return Object.assign({}, state, {
			loading:false,
			error: action.err
		});
	} else {
		return state;
	}
}