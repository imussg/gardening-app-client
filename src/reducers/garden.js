import {
	fetchPlots,
	FETCH_PLOTS_REQUEST,
	FETCH_PLOTS_SUCCESS,
	FETCH_PLOTS_ERROR,
	SUBMIT_GARDEN_NAME,
	SUBMIT_GARDEN,
	GARDEN_NAME_ERROR,
	TOGGLE_GARDEN_BOOLEAN,
	PLOT_CLICK,
	EDIT_PLOT,
	NEW_PLOT,
	CREATE_PLOT_SUCCESS,
	CREATE_PLOT_ERROR
} from '../actions/garden';

const initialState = {
	hasSubmittedGarden: false,
	garden: {
		plots: []
	},
	plotFocus: null,
	editPlot: false,
	newPlot: false,
	error: ""
}

export default function gardenReducer(state=initialState, action) {

	if(action.type === SUBMIT_GARDEN) {
		return Object.assign({}, state, {
			garden: action.res
		});
	} else if(action.type === EDIT_PLOT) {
		return Object.assign({}, state, {
			editPlot: true
		});
	} else if(action.type === NEW_PLOT) {
		return Object.assign({}, state, {
			newPlot: true,
		});
	} else if(action.type === CREATE_PLOT_SUCCESS) {
		return Object.assign({}, state, {
			editPlot: false,
			newPlot: false,
			plotFocus: action.plot
		});
	} else if(action.type === CREATE_PLOT_ERROR) {
		return Object.assign({}, state, {
			error: action.error
		});
	}
	} else if(action.type === TOGGLE_GARDEN_BOOLEAN) {
		return Object.assign({}, state, {
			hasSubmittedGarden: !state.hasSubmittedGarden
		});
	} else if(action.type === GARDEN_NAME_ERROR) {
		return Object.assign({}, state, {
			error: action.err,
			hasSubmittedGarden: false,
			gardenName: "",
			garden: {}
		});
	} else if(action.type === PLOT_CLICK) {
		return Object.assign({}, state, {
			plotFocus: action.plot
		});
	} else if(action.type === FETCH_PLOTS_REQUEST) {
		return Object.assign({}, state, {
			error: null,
			loading: true
		});
	} else if(action.type === FETCH_PLOTS_SUCCESS) {
		return Object.assign({}, state, {
			loading: false,
			plotFocus: null,
			garden: action.res,
			error: null
		});
	} else if(action.type === FETCH_PLOTS_ERROR) {
		console.log(action.err);
		return Object.assign({}, state, {
			loading: false,
			plotFocus: null,
			plots: [],
			error: action.err.message
		});
	}
	return state;
}