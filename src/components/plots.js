import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

import { fetchPlots } from '../actions/garden';

export class Plot extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			expanded: props.expanded,
			plot: props.plot
		}
	}

	createThumbnail() {
		let thumbPic;
		if(!isEmpty(this.state.plot.veggies)) {
			const thumbVeggie = this.state.plot.veggies.filter(veggie => {
				return veggie.pictureUrl !== "";
			})[0];
			thumbPic = {
				url: thumbVeggie.pictureUrl,
				alt: thumbVeggie.pictureAlt
			};
		} else {
			thumbPic = {
				url: "",
				alt: ""
			};
		}
		return (<div class="col-3" id={this.state.plot.name}>
			<img src={thumbPic.url} alt={thumbPic.alt} />
			<figcaption>
				<p class="caption-name">{this.props.name}</p>
				<p class="caption-veggies">{this.state.plot.veggies?this.state.plot.veggies.length:0} veggies</p>
			</figcaption>
		</div>
		);
	}

	createExpanded() {

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
	// the plot which is being focused on and hence has its details shown
	expanded: state.expanded,
	veggies: [...state.veggies],
	name: state.name
});

export default connect(mapStateToProps)(Plot);