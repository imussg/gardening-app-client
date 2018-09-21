import {
	FOCUS_VEGGIE,
	EDIT_VEGGIE_SUCCESS,
	EDIT_VEGGIE_ERROR
} from '../actions/veggie';

const initialState = {
	focus: null,
	isedit: false,
	isnew: false,
	error: null,
	loading: false
};

export default function veggieReducer(state=initialState, action) {
	if(action.type === FOCUS_VEGGIE) {
		return Object.assign({}, state, {
			focus: action.veggieFocus,
			isedit: true,
			loading: false
		});
	} else if(action.type === EDIT_VEGGIE_SUCCESS) {
		return Object.assign({}, state, {
			// set plotFocus to reload the entire plot with the edited veggie in it
			isedit: false,
			isnew: false,
			error: null,
			focus: action.veggie,
			loading: false
		});
	} else if(action.type === EDIT_VEGGIE_ERROR) {
		return Object.assign({}, state, {
			isedit: false,
			isnew: false,
			loading: false,
			error: action.error
		})
	}
	return state;
}