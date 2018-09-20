import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import gardenReducer from './reducers/garden';
import plotReducer from './reducers/plot';
import veggieReducer from './reducers/veggie';

export default createStore(
	combineReducers({
		garden: gardenReducer,
		plot: plotReducer,
		veggie: veggieReducer,
		form: formReducer
	}),
	applyMiddleware(thunk)
);