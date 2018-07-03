

export const FETCH_CHEESES = 'FETCH_CHEESES';
export const fetchCheeses = () => dispatch => (
	dispatch(fetchCheesesRequest()))
		.then(() => fetch(`localhost:8080/api/cheeses`, {
			method: 'GET'
		}))
		.then(res => dispatch(fetchCheesesSuccess(res.json())))
		.catch(err => dispatch(fetchCheesesError(err)));
	// fetch(`localhost:8080/api/cheeses`))
	// .then();

export const FETCH_CHEESES_REQUEST = 'FETCH_CHEESES_REQUEST';
export const fetchCheesesRequest = () => ({
	type: FETCH_CHEESES_REQUEST
});

export const FETCH_CHEESES_SUCCESS = 'FETCH_CHEESES_SUCCESS';
export const fetchCheesesSuccess = (res) => ({
	type: FETCH_CHEESES_SUCCESS,
	res
});

export const FETCH_CHEESES_ERROR = 'FETCH_CHEESES_ERROR';
export const fetchCheesesError = (err) => ({
	type: FETCH_CHEESES_ERROR,
	err
});
	//  .then(res => {
	// 	if(!res.ok) {
	// 		Promise.reject(res.statusText);
	// 	}
	// 	return res.json();
	// })
	//  .then(cheeses => {
	//  	dispatch(fetchCheesesSuccess(cheeses));
	//  });

