import React from 'react';
import { connect } from 'react-redux';

import GardensearchForm from './forms/gardensearch';
import Garden from './garden';

import { findGarden } from '../actions/garden';

export class LandingPage extends React.Component {

	// onSubmit(name) {
	// 	this.props.dispatch(findGarden(name));
	// 	console.log(this.props);
	// }

	findGardenByName(name) {
		this.props.dispatch(findGarden(name));
	}

	render() {

		if(!this.props.hasSubmittedGarden) {
			return (
				<div className="row">
					<div className="col-12">
						<h1>Gardening App</h1>
					</div>
					<div className="col-12">
						<GardensearchForm />
					</div>
			    </div>
			);
		} else {
			return (
				<div className="row">
					<div className="col-12">
						<h1>Gardening App</h1>
					</div>
					<div className="col-12">
						<Garden />
					</div>
			    </div>
			);
		}
		// return <Garden id={this.props.}
	}
}

const mapStateToProps = state => ({
	hasSubmittedGarden: state.garden.hasSubmittedGarden,
	gardenName: state.garden.name,
	gardenId: state.garden.id
});

export default connect(mapStateToProps)(LandingPage);