import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/cheese';

export default createStore(
	reducer,
	applyMiddleware(thunk)
);