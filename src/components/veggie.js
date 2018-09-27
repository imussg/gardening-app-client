import React from 'react';
import { connect } from 'react-redux';
// import { focusVeggie, minusIndex, addIndex } from '../actions/veggie';
import { focusVeggie, deleteVeggie } from '../actions/veggie';
// import Modal from 'react-modal';

export class Veggie extends React.Component {

	onVeggieClick() {
		this.props.dispatch(focusVeggie(this.props.veggie));
	}

	newVeggieOption() {
		let currentVeggie = {pictureUrl: "", pictureAlt: "", name: ""};
		if(this.props.editVeg) {
			currentVeggie = this.props.veggieFocus;
		} else {
			currentVeggie = this.props.possibleVeggies ? this.props.possibleVeggies[this.props.index] : currentVeggie;
		}
		return (<div className="veggie-quick-container">
				<img src={currentVeggie.pictureUrl} alt={currentVeggie.pictureAlt} className="veggie-quick-img"/>
				<div className="veggie-quick-title">{currentVeggie.name}</div>
				<button type="button" className="green" id="previous-button" onClick={() => this.previous()}>Previous</button>
				<button type="button" className="green" id="next-button" onClick={() => this.next()}>Next</button>
			</div>);
	}

	// previous() {
	// 	console.log(this.props);
	// 	this.props.dispatch(minusIndex());
	// 	const nextFocusVeggie = this.props.possibleVeggies[this.props.index];
	// 	this.props.veggie = {...nextFocusVeggie};
	// 	this.props.dispatch(focusVeggie(nextFocusVeggie));
	// 	console.log(this.props);
	// }

	// next() {
	// 	this.props.dispatch(addIndex());
	// 	this.props.dispatch(focusVeggie(this.props.possibleVeggies[this.props.index]));
	// }

	deleteVeggie() {
		this.props.dispatch(deleteVeggie(this.props.veggie));
	}

	render() {
		if(this.props.isNew || this.props.editVeg) {
			return this.newVeggieOption();
		}
		return (<div className="col-3" id={this.props.veggie.id} key={this.props.veggie.id} >
			<div className="row veggie-picture" id={this.props.veggie.name}>
				<img className="veggie-img" src={this.props.veggie.pictureUrl} alt={this.props.veggie.pictureAlt} onClick={()=>this.onVeggieClick()}/>
				<span className="close veggie-delete" onClick={() => this.deleteVeggie()}>&times;</span>
			</div>
			<div className="veggie-info-container">
				<div className="row veggie-name">{this.props.veggie.name}</div>
				<div className="row veggie-condition">{this.props.veggie.condition}</div>
				<div className="row veggie-created">Started on: {this.props.veggie.createdAt}</div>
			</div>
		</div>);
	}
}

const mapStateToProps = state => ({
	plot: state.plot.focus,
	index: state.veggie.index,
	possibleVeggies: state.veggie.possibleVeggies,
	veggieFocus: state.veggie.focus,
	editVeg: state.veggie.isedit
});

export default connect(mapStateToProps)(Veggie);