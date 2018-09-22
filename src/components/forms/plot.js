import React from 'react';
import { connect } from 'react-redux';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';

import { createPlot, sendEditPlot, editPlot } from '../../actions/plot';

export class PlotForm extends React.Component {

	onEditSubmit(event) {
		event.preventDefault();
		const name = this.plotName.value || this.props.plotFocus.name;
		const veggies = this.props.plotFocus.veggies.map(vegg => {
			return vegg.id;
		});
		let editedPlot = {...this.props.plotFocus};
		editedPlot = {
			id: this.props.plotFocus.id, 
			gardenId: this.props.plotFocus.gardenId,
			name: name
		};
		
		// const editedPlot = {
		// 	name: newPlotName,
		// 	gardenId: this.props.plotFocus.gardenId,
		// 	veggies: this.props.plotFocus.veggies ? [...this.props.plotFocus.veggies] : []
		// };
		// console.log(editedPlot);
		this.props.dispatch(sendEditPlot(editedPlot));
	}

	onCancel(event) {
		this.props.dispatch(editPlot());
	}

	render() {
		if(this.props.editPlot) {
			let name = this.props.plotFocus.name;
			return (
				<form className="edit-plot" onSubmit={(event) => this.onEditSubmit(event)} >
					<div className="edit-plot-form-elements row">
						<div className="col-4 edit-plot-instructions">
							Press enter to save the plot's name
						</div>
						<div className="col-4 plot-name-input">
							<input type="text" ref={input => this.plotName = input} id="plot-name" name="plot-name" defaultValue={name+""} />
						</div>
					</div>
				</form>
			);
		} else {
			return <form></form>;
		}
	}
}

const mapStateToProps = state => ({
	plotFocus: state.plot.focus,
	editPlot: state.plot.isedit,
	newPlot: state.plot.isnew
});

export default connect(mapStateToProps)(PlotForm);