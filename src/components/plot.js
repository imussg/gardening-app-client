import React from 'react';
import { connect } from 'react-redux';

import { fetchPlots } from '../actions/garden';

export default class Plot extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			expanded: props.expanded,
			plot: props.plot,
			onPlotClick: props.onPlotClick,
			toggleEditPlot: props.toggleEditPlot
		}
	}

	createThumbnail() {
		const thumbVeggie = this.state.plot.veggies.filter(veggie => {
			return veggie.pictureUrl !== "";
		})[0];
		const thumbPic = {
			url: thumbVeggie.pictureUrl,
			alt: thumbVeggie.pictureAlt
		};

		return (<div className="col-3" id={this.state.plot.id} onClick={event=>this.state.onPlotClick(event.currentTarget.getAttribute("id"))}>
			<img src={thumbPic.url} alt={thumbPic.alt} />
			<figcaption>
				<p className="caption-name">{this.state.plot.name}</p>
				<p className="caption-veggies">{this.state.plot.veggies.length} veggies</p>
			</figcaption>
		</div>
		);
	}

	createExpanded() {
		const veggies = this.state.plot.veggies.map(veggie => {
			return (<div className="col-3" key={veggie.id}>
				<div className="row veggie-picture" id={veggie.name}>
					<img src={veggie.pictureUrl} alt={veggie.pictureAlt} />
				</div>
				<div className="veggie-info-container">
					<div className="row veggie-name">{veggie.name}</div>
					<div className="row veggie-condition">{veggie.condition}</div>
					<div className="row veggie-created">Started on: {veggie.createdAt}</div>
				</div>
				<div className="row veggie-crud-buttons" id={veggie.id}>
					<div className="col-6 veg-edit-wrap">
						<button className="veggie-edit" type="button">Edit</button>
					</div>
					<div className="col-6 veg-del-wrap">
						<button className="veggie-delete" type="button">Delete</button>
					</div>
				</div>
			</div>);
		});
		return (<div className="expanded-plot">
			<div className="row" onClick={event=>this.state.toggleEditPlot(event)}>
				<h1 className="expanded-plot-title">{this.state.plot.name}</h1>
			</div>
			<div className="row veggies-row">
				{veggies}
			</div>
		</div>);
	}

	render() {
		if(this.state.expanded) {
			return this.createExpanded();
		} else {
			return this.createThumbnail();
		}
	}
}

// const mapStateToProps = state => ({
// 	expanded: state.expanded,
// 	plot: state.plot,
// 	name: state.name
// });

// export default connect(mapStateToProps)(Plot);