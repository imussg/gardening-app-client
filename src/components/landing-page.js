import React from 'react';
import { connect } from 'react-redux';

import GardensearchForm from './forms/gardensearch';
import Garden from './garden';

import { deleteGarden } from '../actions/garden';
import { newPlot } from '../actions/plot';

// import { findGarden } from '../actions/garden';

export class LandingPage extends React.Component {

	newPlot() {
		this.props.dispatch(newPlot());
	}

	deleteGarden() {
		this.props.dispatch(deleteGarden(this.props.garden.id));
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
						<h1>{this.props.garden ? this.props.garden.name : "Gardening App"}</h1>
						<div className="new-plot">
							<button onClick={()=>this.deleteGarden()} className="delete-garden-button" type="button">Delete Garden</button>
							<button onClick={()=>this.newPlot()} className="new-plot-button" type="button">Add New Plot</button>
						</div>
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
	garden: state.garden.garden
});

export default connect(mapStateToProps)(LandingPage);