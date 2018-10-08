import {
	FETCH_PLOTS_REQUEST,
	FETCH_PLOTS_SUCCESS,
	FETCH_PLOTS_ERROR,
	SUBMIT_GARDEN,
	GARDEN_NAME_ERROR,
	TOGGLE_GARDEN_BOOLEAN,
	DELETE_GARDEN_SUCCESS
} from '../actions/garden';
 
const initialState = {
	loading: false,
	hasSubmittedGarden: false,
	garden: {
		plots: []
	},
	error: null
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
			garden: initialState.garden
		});
	} else if(action.type === FETCH_PLOTS_REQUEST) {
		return Object.assign({}, state, {
			error: null,
			loading: true
		});
	} else if(action.type === FETCH_PLOTS_ERROR) {
		// console.log(action.err);
		return Object.assign({}, state, {
			loading: false,
			error: action.err.message
		});
	} else if(action.type === FETCH_PLOTS_SUCCESS) {
		// console.log(action.res);
		return Object.assign({}, state, {
			hasSubmittedGarden: true,
			loading: false,
			garden: action.res,
			error: null
		});
	} else if(action.type === DELETE_GARDEN_SUCCESS) {
		return Object.assign({}, state, {
			hasSubmittedGarden: false,
			loading: false,
			garden: null,
			error: null
		});
	}
	return state;
}