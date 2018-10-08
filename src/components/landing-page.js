import React from 'react';
import { connect } from 'react-redux';

import GardensearchForm from './forms/gardensearch';
import Garden from './garden';

// import { deleteGarden } from '../actions/garden';
import { clicked } from '../actions/plot';

// import { findGarden } from '../actions/garden';

export class LandingPage extends React.Component {

	applyPlotClick() {
		console.log(this.props);
		if(this.props.plotFocus && !this.props.plotClicked) {
			this.props.dispatch(clicked());
		}
	}

	render() {

		if(!this.props.hasSubmittedGarden) {
			return (
				<div className="row">
					<div className="col-12">
						<h1>Plotify</h1>
						<p><sub>A gardening app to organize your plots and track your veggies</sub></p>
					</div>
					<div className="col-12 garden-container" onClick={() => this.applyPlotClick()}>
						<GardensearchForm />
					</div>
			    </div>
			);
		} else {
			return (<div className="row" onClick={() => this.applyPlotClick()}>
				<Garden />
			</div>);
		}
	}
}

const mapStateToProps = state => ({
	hasSubmittedGarden: state.garden.hasSubmittedGarden,
	garden: state.garden.garden,
	plotFocus: state.plot.focus,
	plotClicked: state.plot.clicked
});

export default connect(mapStateToProps)(LandingPage);