import React from 'react';
import { connect } from 'react-redux';
// import {reduxForm, Field, SubmissionError, focus} from 'redux-form';

import { createPlot, sendEditPlot, editPlot, clicked } from '../../actions/plot';

export class PlotForm extends React.Component {

	componentDidMount() {
		this.plotName.focus();
		this.props.dispatch(clicked());
	}

	onEditSubmit(event) {
		event.preventDefault();
		const name = this.plotName.value || this.props.plotFocus.name;
		let editedPlot = {
			name: name
		};
		if(this.props.editPlot) {
			editedPlot.id = this.props.plotFocus.id;
			this.props.dispatch(sendEditPlot(editedPlot));
		} else {
			editedPlot.gardenId = this.props.garden.id;
			this.props.dispatch(createPlot(editedPlot));
		}
	}1

	onCancel(event) {
		this.props.dispatch(editPlot());
	}

	firstClick() {
		this.props.dispatch(clicked());
	}

	render() {
		let instructions = "Press enter to save the plot's name";
		if(this.props.clicked) {
			instructions = "";
		}
		let name = "";
		if(this.props.editPlot) {
			name = this.props.plotFocus.name;
			return (
				<form className="edit-plot" onSubmit={(event) => this.onEditSubmit(event)} >
					<div className="edit-plot-form-elements row" >
						<label className="col-4 plot-instructions">
							{instructions}
						</label>
						<div className="plot-name-input">
							<input type="text" ref={input => this.plotName = input} id="plot-name" name="plot-name" defaultValue={name+""}/>
						</div>
					</div>
				</form>
			);
		} else {
			return (<form className="new-plot" onSubmit={(event) => this.onSubmit(event)} >
				<div className="edit-veggie-form-elements row">
					<div className="col-4 veggie-input">
						<label htmlFor="plot-name" className="plot-name-label">
							Name:
						</label>
						<input type="text" ref={input => this.plotName = input} id="plot-name" name="plot-name" />
					</div>
				</div>
				<button type="submit" className="submit">Submit</button>
				<button type="button" className="cancel" onClick={() => this.onCancel()}>Cancel</button>
			</form>
			);
		}
	}
}

const mapStateToProps = state => ({
	garden: state.garden.garden,
	plotFocus: state.plot.focus,
	editPlot: state.plot.isedit,
	newPlot: state.plot.isnew,
	clicked: state.plot.clicked
});

export default connect(mapStateToProps)(PlotForm);