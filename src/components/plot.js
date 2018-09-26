import React from 'react';
import { connect } from 'react-redux';

import Veggie from './veggie';

const plotPicDefault = require('../stock-plot.png');
 
export class Plot extends React.Component {

	onVeggieClick(id) {
		// console.log(this.props);
		console.log(id);
		this.props.onVeggieClick(id);
	}

	createThumbnail() {
		let thumbVeggie = {};
		thumbVeggie.pictureUrl = plotPicDefault;
		thumbVeggie.pictureAlt = "default plot pic";
		if(this.props.plot.veggies.length > 0) {
			const tempVeg = this.props.plot.veggies.filter(veggie => {
				return veggie.pictureUrl !== "";
			})[0];
			thumbVeggie.pictureUrl = tempVeg.pictureUrl;
			thumbVeggie.pictureAlt = tempVeg.pictureAlt;
		}
		let thumbPic = {};
		thumbPic.url = thumbVeggie.pictureUrl;
		thumbPic.alt = thumbVeggie.pictureAlt;
		// console.log(this.props.plot);
		// const thumbVeggie = this.props.plot.veggies.length === 0 ? {pictureUrl: "", pictureAlt: ""} : this.props.plot.veggies.filter(veggie => {
		// 	return veggie.pictureUrl !== "";
		// })[0];
		// const thumbPic = {
		// 	url: thumbVeggie.pictureUrl,
		// 	alt: thumbVeggie.pictureAlt
		// };

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
		// console.log(this.props);
		const veggies = this.props.plot.veggies ? this.props.plot.veggies.map(veggie => {
			return <Veggie veggie={veggie} key={veggie.id}/>;
		}) : [];
		// if(veggies === []) {	console.log("empty");	}
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
	editVeggie: state.veggie.isedit
});

export default connect(mapStateToProps)(Plot);