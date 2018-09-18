import React from 'react';
import { connect } from 'react-redux';

import { fetchPlots } from '../actions/garden';

class Plot extends React.Component {

	constructor(props) {
		super(props)
		console.log(props);
	}

	// onVeggieClick(id) {
	// 	console.log(this.props);
	// 	console.log(id);
	// this.props.onVeggieClick(id);
	// }

	createThumbnail() {
		const thumbVeggie = this.props.plot.veggies.filter(veggie => {
			return veggie.pictureUrl !== "";
		})[0];
		const thumbPic = {
			url: thumbVeggie.pictureUrl,
			alt: thumbVeggie.pictureAlt
		};

		return (<div className="col-3" id={this.props.plot.id} onClick={event=>this.props.onPlotClick(event.currentTarget.getAttribute("id"))}>
			<img src={thumbPic.url} alt={thumbPic.alt} />
			<figcaption>
				<p className="caption-name">{this.props.plot.name}</p>
				<p className="caption-veggies">{this.props.plot.veggies.length} veggies</p>
			</figcaption>
		</div>
		);
	}

	createExpanded() {
		console.log(this.props);
		const veggies = this.props.plot.veggies.map(veggie => {
			return (<div className="col-3" id={veggie.id} key={veggie.id} onClick={event=>this.props.onVeggieClick(event.currentTarget.getAttribute("id"))}>
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
		return (<div className="row veggies-row">
			{veggies}
		</div>);
	}

	render() {
		if(this.props.expanded) {
			return this.createExpanded();
		} else {
			return this.createThumbnail();
		}
	}
}

const mapStateToProps = state => ({
	plotFocus: state.plotFocus,
	// expanded: state.expanded,
	veggieFocus: state.veggieFocus
});

export default connect(mapStateToProps)(Plot);
// export default Plot;