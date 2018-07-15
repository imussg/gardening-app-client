import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

import Plot from './plot';
import PlotForm from './forms/plot';
import { focusPlot, editPlot, createPlot } from '../actions/garden';


export class Garden extends React.Component {

	onPlotClick(plotId) {
		const clickedPlot = this.props.garden.plots.filter(plot => (plot.id === plotId))[0];
		this.props.dispatch(focusPlot(clickedPlot));
	}

	editPlot() {
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
			return (<Plot
				plot={plot}
				expanded={false}
				onPlotClick={plotId => this.onPlotClick(plotId)}
				toggleEditPlot={event => this.editPlot(event)}
				key={plot.id}
			/>);
		});
		let focusedPlotJsx = this.props.plotFocus ? this.generatePlot(this.props.plotFocus) : '';

		return (<div className="garden-plots">
			<div className="row plots">{plots}</div>
			{this.getFocusedPlotTitleJsx()}
			<div className="row focused-plot-veggies">
				{focusedPlotJsx}
			</div>
		</div>
		);
	}
	// sees if "editPlot" is true, makes title a form if so, displays it as a "h1" if false
	getFocusedPlotTitleJsx() {
		if(this.props.plotFocus) {	
			if(this.props.editPlot) {
				return (<div className="row  focused-plot-title">
					<PlotForm />
				</div>);
			}
			return (<div className="row  focused-plot-title">
				<div className="col-4 new-plot">
					<button onClick={()=>this.newPlot()} className="new-plot-button" type="button">New Plot</button>
				</div>
				<div className="col-4 focused-plot-title">
					{this.props.plotFocus.name}
				</div>
				<div className="col-4 edit-plot">
					<button onClick={()=>this.editPlot()} className="edit-plot-button" type="button">Edit Plot</button>
				</div>
			</div>);
		}
		return "";
	}

	generatePlot(plot) {
		if(this.props.newPlot) {
			return <PlotForm />;
		}
		
		// const plotForm = this.props.editPlot ? <PlotForm /> : noEditTitle;
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
	plotFocus: state.plotFocus,
	garden: state.garden,
	newPlot: state.newPlot,
	editPlot: state.editPlot,
	error: state.error
	// plots: [...state.plots]
});

export default connect(mapStateToProps)(Garden);