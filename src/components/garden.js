import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

import Plot from './plot';
import PlotForm from './forms/plot';
import VeggieForm from './forms/veggie';

import { focusVeggie, unfocusVeggie, createVeggie } from '../actions/veggie';
import { focusPlot, editPlot } from '../actions/plot';

export class Garden extends React.Component {

	onPlotClick(plotId) {
		const clickedPlot = this.props.garden.plots.filter(plot => (plot.id === plotId))[0];
		// console.log(plotId);
		this.props.dispatch(focusPlot(clickedPlot));
	}

	onVeggieClick(veggieId) {
		const clickedVeggie = this.props.plot.veggies.filter(veggie => (veggie.id === veggieId))[0];
		// console.log(clickedVeggie);
		this.props.dispatch(focusVeggie(clickedVeggie));
	}
 
	editPlot(event) {
		this.props.dispatch(editPlot(this.props.plot));
	}

	newVeggie() {
		this.props.dispatch(createVeggie());
	}

	render() {
		if(this.props.loading) {
			return <Spinner spinnerName="circle" noFadeIn />;
		}

		if(this.props.error) {
			return <strong>{this.props.error}</strong>;
		}
		const plots = this.props.garden.plots ? this.props.garden.plots.map(plot => {
			if(plot) {
				return (<Plot
					plot={plot} 
					expanded={false} 
					onVeggieClick={veggieId => this.onVeggieClick(veggieId)} 
					onPlotClick={plotId => this.onPlotClick(plotId)} 
					key={plot.id} 
				/>);
			} else {
				return "";
			}
		}) : "";
		let focusedPlotJsx = this.props.plotLoading
				? <Spinner spinnerName="circle" noFadeIn />
				: (this.props.plot
					? this.generatePlot(this.props.plot)
					: '');
		let editVeggieJsx = this.generateVeggieModal();
		// let newPlotJsx = this.generatePlotModal();

		return (<div className="garden-plots">
			<div className="row plots">{plots}</div>
			{this.getFocusedPlotTitleJsx()}
			<div className="row focused-plot-veggies">
				{focusedPlotJsx}
				{editVeggieJsx}
			</div>
		</div>);
	}
	// sees if "editPlot" is true, makes title a form if so, displays it as a "h1" if false
	getFocusedPlotTitleJsx() {
		let instructions = this.props.plotClicked ? "" : "Click on the plot name to change it";
		if(this.props.plot) {	
			if(this.props.editPlot) {
				return (<div className="row focused-plot-title">
					<PlotForm />
				</div>);
			}
			return (<div className="row focused-plot-title" onClick={(event)=>this.editPlot(event.currentTarget)}>
				<div className="col-4 new-plot">
					<p className="plot-instructions">{instructions}</p>
				</div>
				<div className="col-4 focused-plot-title">
					{this.props.plot.name}
				</div>
				<div className="col-4 edit-plot">
					<button onClick={()=>this.newVeggie()} className="new-veggie-button" type="button">Add new Veggie</button>
				</div>
			</div>);
		}
		return "";
	}

	generateVeggieModal() {
		if(this.props.editVeggie || this.props.newVeggie) {
			// console.log("in generating veggie edit modal");
			return (<div className="modal">
				<div className="modal-content">
					<span className="close" onClick={() => this.removeVeggieFocus()}>&times;</span>
					<div className="veggie-form">
						<VeggieForm />
					</div>
				</div>
			</div>);
		}
		return "";
	}

	generatePlotModal() {
		if(this.props.newPlot) {
			return (<div className="modal">
				<div className="modal-content">
					<span className="close" onClick={() => this.cancelNewPlot()}>&times;</span>
					<div className="veggie-form">
						<PlotForm />
					</div>
				</div>
			</div>);
		}
		return "";
	}

	cancelNewPlot() {
		this.props.dispatch(focusPlot(null));
	}

	removeVeggieFocus() {
		this.props.dispatch(unfocusVeggie());
	}

	generatePlot(plot) {
		if(this.props.newPlot) {
			return <PlotForm />;
		}
		
		return (<div className="expanded-plot">
			<Plot
				plot={plot}
				expanded={true}
				onPlotClick={plotId => this.onPlotClick(plotId)}
				key={plot.id}
			/>
		</div>);
	}

}

const mapStateToProps = state => ({
	hasSubmittedGarden: state.hasSubmittedGarden,
	// the plot which is being focused on and hence has its details shown
	plot: state.plot.focus || null,
	veggie: state.veggie.focus || null,
	garden: state.garden.garden || null,
	newPlot: state.plot.isnew,
	editPlot: state.plot.isedit,
	newVeggie: state.veggie.isnew,
	editVeggie: state.veggie.isedit,
	loading: state.garden.loading,
	plotLoading: state.plot.loading,
	veggieLoading: state.veggie.loading,
	plotClicked: state.plot.clicked,
	error: state.garden.error
});
 
export default connect(mapStateToProps)(Garden);