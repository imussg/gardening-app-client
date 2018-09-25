import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import './index.css';

import LandingPage from './components/landing-page';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Provider store={store} >
		<LandingPage />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();