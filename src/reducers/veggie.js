import {
	FOCUS_VEGGIE,
	ADD_INDEX,
	MINUS_INDEX,
	CREATE_VEGGIE,
	UNFOCUS_VEGGIE,
	EDIT_VEGGIE_SUCCESS,
	EDIT_VEGGIE_ERROR,
	SET_POSSIBLE_VEGGIES
} from '../actions/veggie';

const initialState = {
	focus: null,
	isedit: false,
	isnew: false,
	error: null,
	loading: false,
	possibleVeggies: null,
	index: 0
};

export default function veggieReducer(state=initialState, action) {
	if(action.type === FOCUS_VEGGIE) {
		return Object.assign({}, state, {
			focus: action.veggieFocus,
			isedit: true,
			loading: false
		});
	} else if(action.type === ADD_INDEX) {
		const ind = state.index < state.possibleVeggies.length-1 ? state.index+1 : state.index;
		return Object.assign({}, state, {
			index: ind,
			focus: state.possibleVeggies[ind]
		});
	} else if(action.type === MINUS_INDEX) {
		const ind = state.index > 0 ? state.index-1 : 0;
		return Object.assign({}, state, {
			index: ind,
			focus: state.possibleVeggies[ind]
		});
	} else if(action.type === CREATE_VEGGIE) {
		return Object.assign({}, state, {
			isedit: false,
			isnew: true,
			loading: false
		});
	} else if(action.type === UNFOCUS_VEGGIE) {
		return Object.assign({}, state, {
			isedit: false,
			isnew: false,
			focus: null
		});
	} else if(action.type === EDIT_VEGGIE_SUCCESS) {
		return Object.assign({}, state, {
			// set plotFocus to reload the entire plot with the edited veggie in it
			isedit: false,
			isnew: false,
			error: null,
			loading: false
		});
	} else if(action.type === EDIT_VEGGIE_ERROR) {
		return Object.assign({}, state, {
			isedit: false,
			isnew: false,
			loading: false,
			error: action.error
		});
	} else if(action.type === SET_POSSIBLE_VEGGIES) {
		return Object.assign({}, state, {
			possibleVeggies: [...action.veggies]
		});
	}
	return state;
}