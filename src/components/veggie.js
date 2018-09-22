import React from 'react';
import { connect } from 'react-redux';
import { focusVeggie } from '../actions/veggie';
// import Modal from 'react-modal';

export class Veggie extends React.Component {

	constructor(props) {
		super(props);
	}

	onVeggieClick() {
		this.props.dispatch(focusVeggie(this.props.veggie));
	}

	render() {
		return (<div className="col-3" id={this.props.veggie.id} key={this.props.veggie.id} onClick={()=>this.onVeggieClick()} >
			<div className="row veggie-picture" id={this.props.veggie.name}>
				<img src={this.props.veggie.pictureUrl} alt={this.props.veggie.pictureAlt} />
			</div>
			<div className="veggie-info-container">
				<div className="row veggie-name">{this.props.veggie.name}</div>
				<div className="row veggie-condition">{this.props.veggie.condition}</div>
				<div className="row veggie-created">Started on: {this.props.veggie.createdAt}</div>
			</div>
			<div className="row veggie-crud-buttons" id={this.props.veggie.id}>
				<div className="col-6 veg-edit-wrap">
					<button className="veggie-edit" type="button">Edit</button>
				</div>
				<div className="col-6 veg-del-wrap">
					<button className="veggie-delete" type="button">Delete</button>
				</div>
			</div>
		</div>);
	}
}

const mapStateToProps = state => ({
	plot: state.plot.focus,
});

export default connect(mapStateToProps)(Veggie);