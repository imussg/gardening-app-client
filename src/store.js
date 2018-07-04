import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import gardenReducer from './reducers/garden';

export default createStore(
	gardenReducer,
	applyMiddleware(thunk)
);