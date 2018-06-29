import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CheeseList from './components/cheese-list'
import registerServiceWorker from './registerServiceWorker';

const cheeses = [
	"Bath Blue",
	"Barkham Blue",
	"Buxton Blue"
];

ReactDOM.render(<CheeseList cheeses={cheeses} />, document.getElementById('root'));
registerServiceWorker();
