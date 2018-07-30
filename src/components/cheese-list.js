import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import { fetchCheeses } from '../actions/cheese';

export class CheeseList extends React.Component {

	// renderResults() {
		
		// if(this.props.loading) {
		// 	return <Spinner spinnerName="circle" noFadeIn />;
		// }

		// if(this.props.error) {
		// 	return <strong>{this.props.error}</strong>;
		// }

		// const cheeses = this.props.cheeses.map((cheese, index) => (
		// 	<li key={"ch"+index}>{cheese}</li>
		// ));
		// return <ul className="cheese-search-results">{cheeses}</ul>;
	// }

	render() {
		if(this.props.loading) {
			return <Spinner spinnerName="circle" noFadeIn />;
		}

		if(this.props.error) {
			return <strong>{this.props.error}</strong>;
		}

		const cheeses = this.props.cheeses ? this.props.cheeses.map((cheese, index) => (
			<li key={"ch"+index}>{cheese}</li>
		)) : '';
		return <ul className="cheese-search-results">{cheeses}</ul>;
	}

}

const mapStateToProps = state => {

	console.log([...state.cheeses]);
	return {
		loading: state.loading,
		cheeses: [...state.cheeses],
		error: state.error
	};
};

export default connect(mapStateToProps)(CheeseList);