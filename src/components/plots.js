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
		let thumbPics;
		if(!isEmpty(this.state.plot.veggies)) {
			const thumbVeggies = this.state.plot.veggies.filter((veggie, index)=>{
				console.log(veggie.pictureUrl);
				return veggie.pictureUrl !== "" && index < 6;
			});
			thumbPics = thumbVeggies ? thumbVeggies.map((veggie, index) => {
				return (<div className="col-6">
					<img src={veggie.pictureUrl} alt={veggie.pictureAlt} className="thumbnail-pic"/>
				</div>);
			}) : [""];
		} else {
			thumbPics = [""];
		}
		return (<div class="col-3" id={this.state.plot.name}>
			{...thumbPics}
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