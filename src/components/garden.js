import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

import Plot from './plot';
import { plotClick, editPlot, createPlot } from '../actions/garden';


export class Garden extends React.Component {

	onPlotClick(plotId) {
		const clickedPlot = this.props.garden.plots.filter(plot => (plot.id === plotId))[0];
		this.props.dispatch(plotClick(clickedPlot));
	}

	editPlot(data) {
		this.props.dispatch(editPlot(this.props.plotFocus));
	}

	newPlot(event) {
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
				onPlotClick={plotId => this.onPlotClick(plotId)},
				toggleEditPlot={event => this.toggleEditPlot(event)},
				key={plot.id}
			/>);
		});
		let focusedPlotJsx = this.props.plotFocus ? this.generatePlot(this.props.plotFocus) : '';

		return (<div className="garden-plots">
			<div className="row plots">{plots}</div>
			<div className="row">
				<div className="col-2 new-plot">
					<button onClick={event=>this.newPlot(event)} id="new-plot" type="button">New Plot</button>
				</div>
				<div className="col-2 focused-plot">
					{focusedPlotJsx}
				</div>
				<div className="col-2 edit-plot">
					<button onClick={event=>this.editPlot(event)} className="edit-plot" id={this.props.plotFocus ? this.props.plotFocus.id : "edit-plot"} type="button">New Plot</button>
				</div>
			</div>
		</div>
		);
	}

	generatePlot(plot) {
		if(this.props.editPlot) {
			return (<PlotForm
				plot={plot}
				formType={"edit"}
				onSubmit={data => this.editPlot(data)}
			/>);
		} else if(this.props.newPlot) {

		}
		return (<Plot
			plot={plot}
			expanded={true}
			onPlotClick={plotId => this.onPlotClick(plotId)}
			key={plot.id}
		/>);
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