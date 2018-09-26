import {
	FOCUS_PLOT,
	EDIT_PLOT,
	EDIT_PLOT_REQUEST,
	EDIT_PLOT_SUCCESS,
	NEW_PLOT,
	CREATE_PLOT_SUCCESS,
	CREATE_PLOT_ERROR,
	CLICKED
} from '../actions/plot';

const initialState = {
	focus: null,
	isedit: false,
	isnew: false,
	error: null,
	loading: false,
	clicked: false
};

export default function plotReducer(state=initialState, action) {
	if(action.type === EDIT_PLOT) {
		return Object.assign({}, state, {
			isedit: true
		});
	} else if(action.type === EDIT_PLOT_REQUEST) {
		return Object.assign({}, state, {
			loading: true
		});
	} else if(action.type === EDIT_PLOT_SUCCESS) {
		return Object.assign({}, state, {
			focus: action.plot,
			isedit: false,
			isnew: false,
			loading: false,
			error: null
		});
	} else if(action.type === NEW_PLOT) {
		return Object.assign({}, state, {
			isnew: true,
			isedit: false,
			focus: null
		});
	} else if(action.type === CREATE_PLOT_SUCCESS) {
		return Object.assign({}, state, {
			isedit: false,
			isnew: false,
			focus: action.plot,
			loading: false
		});
	} else if(action.type === CREATE_PLOT_ERROR) {
		return Object.assign({}, state, {
			error: action.error
		});
	} else if(action.type === FOCUS_PLOT) {
		return Object.assign({}, state, {
			focus: action.plotFocus,
			loading: false,
			isedit: false,
			isnew: false,
			error: null
		});
	} else if(action.type === CLICKED) {
		return Object.assign({}, state, {
			clicked: true
		});
	}
	return state;
}