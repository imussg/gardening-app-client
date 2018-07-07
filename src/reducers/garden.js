import {
	fetchPlots,
	FETCH_PLOTS_REQUEST,
	FETCH_PLOTS_SUCCESS,
	FETCH_PLOTS_ERROR
} from '../actions/garden';

const initialState = {
	loading: false,
	focus: null,
	plots: [
		{
			name: "Backyard by fence",
			veggies: [{
				name: "Basil",
				condition: "Has sprouted / not ready for harvest",
				picture: {
					src: "https://thumbs.dreamstime.com/b/herb-series-basil-2246609.jpg",
					alt: "basil-pic"
				}
			}]
		}
	],
	error: null
}

export default function gardenReducer(state=initialState, action) {
	if(action.type === FETCH_PLOTS_REQUEST) {
		return Object.assign({}, state, {
			error: null,
			loading: true
		});
	} else if(action.type === FETCH_PLOTS_SUCCESS) {
		return Object.assign({}, state, {
			loading: false,
			focus: null,
			plots: [...action.res],
			error: null
		});
	} else if(action.type === FETCH_PLOTS_ERROR) {
		return Object.assign({}, state, {
			loading: false,
			focus: null,
			plots: [],
			error: action.err
		});
	}
	return state;
}