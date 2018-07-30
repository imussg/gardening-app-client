import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import { fetchPlots } from '../actions/garden';

export class Garden extends React.Component {

	render() {
		if(this.props.loading) {
			return <Spinner spinnerName="circle" noFadeIn />;
		}

		if(this.props.error) {
			return <strong>{this.props.error}</strong>;
		}
/*
<Plot name={plot.name} veggies={plot.veggies} />
...
<Plot name={plot.name} .... />
*/
		const plots = this.props.plots ? this.props.plots.map(plot => {
			const veggies = plot.veggies ? plot.veggies.map(veggie => {
				return (<div className="flex-grid">
				<li className={veggie.name}>
					<h1 className={`${veggie.name}-title`}>{veggie.name}</h1>
					<img src={veggie.picture.src} alt={veggie.picture.alt} />
					<span className={`${veggie.name}-condition`}>{veggie.condition}</span>
				</li>
				</div>);
			}) : "";
			const plotHtml = (<container className={plot.name}>
				<h1 className={`${plot.name}-title`}>{plot.name}</h1>
				<ul className="veggies-list">{veggies}</ul>
			</container>);
			return plotHtml;
		}) : "";
		return <section className="plots-list">{plots}</section>;
	}
}

const mapStateToProps = state => ({
	loading: state.loading,
	// the plot which is being focused on and hence has its details shown
	focus: state.focus,
	plots: [...state.plots]
});

export default connect(mapStateToProps)(Garden);