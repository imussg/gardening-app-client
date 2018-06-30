export const FETCH_CHEESES = 'FETCH_CHEESES';
export const fetchCheeses = () => dispatch => ;

export const FETCH_CHEESES_REQUEST = 'FETCH_CHEESES_REQUEST';
export const fetchCheesesRequest = () => dispatch => {
	// dispatch(fetchChessesRequest())
	// 	.then(res => {
	// 		if(!res.ok) {
	// 			dispatch(fetchChessesError(res))
	// 		}
			
	// 	})
	fetch(`localhost:8080/api/cheeses`)
	 .then(res => {
		if(!res.ok) {
			Promise.reject(res.statusText);
		}
		return res.json();
	})
	 .then(cheeses => {
	 	dispatch(fetchCheesesSuccess(cheeses));
	 });
};