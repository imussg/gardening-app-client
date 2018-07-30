import {
	FETCH_PLOTS_REQUEST,
	FETCH_PLOTS_SUCCESS,
	FETCH_PLOTS_ERROR,
	SUBMIT_GARDEN,
	GARDEN_NAME_ERROR,
	TOGGLE_GARDEN_BOOLEAN,
	FOCUS_PLOT,
	FOCUS_VEGGIE,
	EDIT_PLOT,
	EDIT_VEGGIE,
	EDIT_PLOT_SUCCESS,
	EDIT_VEGGIE_SUCCESS,
	NEW_PLOT,
	CREATE_PLOT_SUCCESS,
	CREATE_PLOT_ERROR
} from '../actions/garden';
 
const initialState = {
	loading: false,
	hasSubmittedGarden: false,
	garden: {
		plots: []
	},
	plotFocus: null,
	veggieFocus: null,
	editPlot: false,
	newPlot: false,
	newVeggie: false,
	error: ""
}

export default function gardenReducer(state=initialState, action) {

	/////////////////////////////////////////////
	////// MANAGES GARDEN RELATED EVENTS ////////
	/////////////////////////////////////////////
	if(action.type === SUBMIT_GARDEN) {
		return Object.assign({}, state, {
			garden: action.res
		});
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
	/////////////////////////////////////////////
	////// MANAGES PLOT RELATED EVENTS  /////////
	/////////////////////////////////////////////
	} else if(action.type === EDIT_PLOT) {
		return Object.assign({}, state, {
			editPlot: true
		});
	} else if(action.type === EDIT_PLOT_SUCCESS) {
		return Object.assign({}, state, {
			plotFocus: action.plot,
			editPlot: false,
			newPlot: false,
			error: ""
		});
	} else if(action.type === NEW_PLOT) {
		return Object.assign({}, state, {
			newPlot: true,
			editPlot: false
		});
	} else if(action.type === CREATE_PLOT_SUCCESS) {
		return Object.assign({}, state, {
			hasSubmittedGarden: true,
			editPlot: false,
			newPlot: false,
			plotFocus: action.plot
		});
	} else if(action.type === CREATE_PLOT_ERROR) {
		return Object.assign({}, state, {
			error: action.error
		});
	} else if(action.type === FOCUS_PLOT) {
		return Object.assign({}, state, {
			plotFocus: action.plotFocus
		});
	} else if(action.type === FETCH_PLOTS_REQUEST) {
		return Object.assign({}, state, {
			error: null,
			loading: true
		});
	} else if(action.type === FETCH_PLOTS_SUCCESS) {
		return Object.assign({}, state, {
			hasSubmittedGarden: true,
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
	/////////////////////////////////////////////
	////// MANAGES VEGGIE RELATED EVENTS ////////
	/////////////////////////////////////////////
	} else if(action.type === FOCUS_VEGGIE) {
		return Object.assign({}, state, {
			veggieFocus: action.veggieFocus
		});
	} else if(action.type === EDIT_VEGGIE_SUCCESS) {
		return Object.assign({}, state, {
			// set plotFocus to reload the entire plot with the edited veggie in it
			plotFocus: state.plotFocus
		});
	}
	return state;
}