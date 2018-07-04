import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import './index.css';
// import App from './App';
import Garden from './components/garden';
import registerServiceWorker from './registerServiceWorker';

// const cheeses = [
// 	"Bath Blue",
// 	"Barkham Blue",
// 	"Buxton Blue"
// ];

ReactDOM.render(
	<Provider store={store} >
		<Garden />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
