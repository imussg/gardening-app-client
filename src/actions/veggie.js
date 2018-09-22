import { editPlotSuccess } from './plot';
const BASE_URL = 'https://gardening-server.herokuapp.com';

export const sendEditVeggie = (veggie) => dispatch => {
	return fetch(`${BASE_URL}/api/veggies/${veggie.id}`, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(veggie)
	})
	.then((res) => {
		console.log(res);
		if(res.ok) {
			return fetch(`${BASE_URL}/api/plots/${veggie.plotId}`)
			.then(res => res.json())
			.then(plot => dispatch(editPlotSuccess(plot)))
			.then(() => dispatch(editVeggieSuccess()));
		} else {
			return Promise.reject("editing veggie unsuccessful");
		}
	})
	.catch(err => dispatch(editVeggieError(err)));
};
export const FOCUS_VEGGIE = 'FOCUS_VEGGIE';
export const focusVeggie = (veggieFocus) => ({
	type: FOCUS_VEGGIE,
	veggieFocus
});

export const UNFOCUS_VEGGIE = 'UNFOCUS_VEGGIE';
export const unfocusVeggie = () => ({
	type: UNFOCUS_VEGGIE
});

export const EDIT_VEGGIE_SUCCESS = 'EDIT_VEGGIE_SUCCESS';
export const editVeggieSuccess = (veggie) => ({
	type: EDIT_VEGGIE_SUCCESS
});

export const EDIT_VEGGIE_ERROR = 'EDIT_VEGGIE_ERROR';
export const editVeggieError = (error) => ({
	type: EDIT_VEGGIE_ERROR,
	error
});