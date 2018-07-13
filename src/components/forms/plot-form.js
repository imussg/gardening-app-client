import React from 'react';
import { connect } from 'react-redux';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';

import { createPlot, editPlot } from '../../actions/garden';

export class PlotForm extends React.Component {

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
}