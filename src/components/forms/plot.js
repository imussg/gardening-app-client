import React from 'react';
import { connect } from 'react-redux';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';

import { createPlot, sendEditPlot } from '../../actions/garden';

export class PlotForm extends React.Component {

	onEditSubmit() {
		const editedPlot = Object.assign({}, this.props.plotFocus, {name: this.plotName});
		this.props.dispatch(sendEditPlot(editedPlot));
	}
	onSubmit(event) {
		event.preventDefault();
		let plot;
		if(this.props.newPlot) {
			plot = {
				name: this.plotName ? this.plotName.value.trim() : "",
				gardenId: this.props.garden ? this.props.garden.id : null,
				veggies: this.props.veggies ? [...this.props.veggies] : []
			};
			this.props.dispatch(createPlot);
		} else if(this.props.editPlot) {
			plot = {
				id: this.props.plotFocus.id,
				gardenId: this.props.plotFocus.gardenId,
			}
		}
	}

	render() {
		if(this.props.editPlot) {
			return (
				<form className="edit-plot" onSubmit={() => this.onEditSubmit()} >
					<div className="col-4">
						<button type="submit" className="submit-plot-name">Submit</button>
					</div>
					<div className="col-4">
						<input type="text" ref={input => this.plotName = input} id="plot-name" placeholder={this.props.plotFocus.name} />
					</div>
					<div className="col-4">
						<button type="button" className="cancel-plot-name">Cancel</button>
					</div>
				</form>
			);
		} else {
			return <form></form>;
		}
	}
}

const mapStateToProps = state => ({
	plotFocus: state.plotFocus ? state.plotFocus : null,
	editPlot: state.editPlot,
	newPlot: state.newPlot
});

export default connect(mapStateToProps)(PlotForm);