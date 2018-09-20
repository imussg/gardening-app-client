import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

import Plot from './plot';
import PlotForm from './forms/plot';
import VeggieForm from './forms/veggie';
import { fetchGarden } from '../actions/garden';
import { focusVeggie, editVeggie, createVeggie } from '../actions/veggie';
import { focusPlot, editPlot, createPlot } from '../actions/plot';

export class Garden extends React.Component {

	constructor(props) {
		super(props);
		// this.veggieClick = this.veggieClick.bind(this);
	}

	onPlotClick(plotId) {
		const clickedPlot = this.props.garden.plots.filter(plot => (plot.id === plotId))[0];
		console.log(plotId);
		this.props.dispatch(focusPlot(clickedPlot));
	}

	veggieClick(veggieId) {
		const clickedVeggie = this.props.plotFocus.veggies.filter(veggie => (veggie.id === veggieId))[0];
		console.log(clickedVeggie);
		this.props.dispatch(focusVeggie(clickedVeggie));
	}
 
	editPlot(event) {
		this.props.dispatch(editPlot(this.props.plotFocus));
	}

	newPlot() {
		this.props.dispatch(createPlot(this.props.plotFocus));
	}

	render() {
		if(this.props.loading) {
			return <Spinner spinnerName="circle" noFadeIn />;
		}

		if(this.props.error) {
			return <strong>{this.props.error}</strong>;
		}
		const plots = this.props.garden.plots.map(plot => {
			if(plot) {
				return (<Plot
					plot={plot} 
					expanded={false} 
					onVeggieClick={veggieId => this.veggieClick(veggieId)} 
					// veggieClick={veggieId => this.veggieClick(veggieId)}
					onPlotClick={plotId => this.onPlotClick(plotId)} 
					key={plot.id} 
				/>);
			} else {
				return "";
			}
		});
		let focusedPlotJsx = this.props.plotLoading
				? <Spinner spinnerName="circle" noFadeIn />
				: (this.props.plotFocus
					? this.generatePlot(this.props.plotFocus)
					: '');
		let editVeggieJsx = this.generateVeggieModal();

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
		if(this.props.plotFocus) {	
			if(this.props.editPlot) {
				return (<div className="row focused-plot-title">
					<PlotForm />
				</div>);
			}
			return (<div className="row focused-plot-title" onClick={(event)=>this.editPlot(event.currentTarget)}>
				<div className="col-4 new-plot">
					<p className="plot-instructions">Click on the plot name to change it</p>
				</div>
				<div className="col-4 focused-plot-title">
					{this.props.plotFocus.name}
				</div>
				<div className="col-4 edit-plot">
					<button onClick={()=>this.newVeggie()} className="new-veggie-button" type="button">Add new Veggie</button>
				</div>
			</div>);
		}
		return "";
	}

	generateVeggieModal() {
		if(this.props.veggieFocus || this.props.newVeggie) {
			return (<div className="veggie-modal-content">
				<span className="close">&times;</span>
				<div className="veggie-form">
					<VeggieForm />
				</div>
			</div>);
		}
		return "";
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
	plotFocus: state.plot.focus || null,
	garden: state.garden.garden || null,
	newPlot: state.plot.isnew,
	editPlot: state.plot.isedit,
	loading: state.garden.loading,
	plotLoading: state.plot.loading,
	error: state.garden.error
});
 
export default connect(mapStateToProps)(Garden);