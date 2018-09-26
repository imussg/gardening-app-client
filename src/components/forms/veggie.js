import React from 'react';
import { connect } from 'react-redux';
// import {reduxForm, Field, SubmissionError, focus} from 'redux-form';

import { sendEditVeggie, sendNewVeggie, unfocusVeggie, getAllVeggies } from '../../actions/veggie';

import Veggie from '../veggie';

const plotPicDefault = require('../../stock-plot.png');

export class VeggieForm extends React.Component {

	componentDidMount() {
		this.veggieName.focus();
		this.veggieName.select();
		// this.props.dispatch(getAllVeggies());
	}

	onEditSubmit(event) {
		event.preventDefault();
		const veggieName = this.veggieName.value;
		const veggieCondition = this.veggieCondition.value;
		const veggiePictureUrl = this.veggiePictureUrl.value.trim() !== "" ? this.veggiePictureUrl.value.trim() : plotPicDefault;
		const veggiePictureAlt = `${veggieName}-pic`;
		let editedVeggie = this.props.editVeggie ? {"id": this.props.veggieFocus.id, "plotId": this.props.plotFocus.id} : {"plotId": this.props.plotFocus.id};
		editedVeggie["name"] = veggieName;
		editedVeggie["condition"] = veggieCondition;
		editedVeggie["pictureUrl"] = veggiePictureUrl;
		editedVeggie["pictureAlt"] = veggiePictureAlt;
		if(this.props.editVeggie) {
			this.props.dispatch(sendEditVeggie(editedVeggie));
		} else {
			this.props.dispatch(sendNewVeggie(editedVeggie));
			// this.props.dispatch(getAllVeggies());
		}
	}

	onCancel() {
		this.props.dispatch(unfocusVeggie());
	}

	createVeggieJsx() {
		console.log(this.props.possibleVeggies[this.props.index]);
	}

	render() {
		if(!this.props.possibleVeggies) {
			this.props.dispatch(getAllVeggies());
		}
		let name = "", condition = "", pictureUrl = plotPicDefault;
		if(this.props.editVeggie) {
			name = this.props.veggieFocus.name;
			condition = this.props.veggieFocus.condition;
			pictureUrl = this.props.veggieFocus.pictureUrl;
		}
		// console.log(this.props);
		let currentVeg = "";
		if(this.props.editVeggie && this.props.veggieFocus && this.props.possibleVeggies) {
			currentVeg = this.props.possibleVeggies.filter(veg => this.props.veggieFocus.id === veg.id)[0];
			currentVeg = <Veggie veggie={currentVeg} key={currentVeg.id} isNew={false}/>
		} else {
			currentVeg = this.props.possibleVeggies ? <Veggie veggie={this.props.possibleVeggies[this.props.index]} key={this.props.possibleVeggies[this.props.index].id} isNew={true}/> : "";
		}
		return (
			<div className="veggie-container-div">
				<div className="veggie-form">
					<form className="edit-veggie" onSubmit={(event) => this.onEditSubmit(event)} >
						<div className="edit-veggie-form-elements row">
							<div className="col-4 veggie-input">
								<label htmlFor="veggie-name" className="veggie-label">
									Name:
								</label>
								<input type="text" ref={input => this.veggieName = input} id="veggie-name" name="veggie-name" defaultValue={name+""} />
							</div>
						</div>
						<div className="edit-veggie-form-elements row">
							<div className="col-4 veggie-input">
								<label htmlFor="veggie-condition" className="veggie-label">
									Condition: 
								</label>
								<input type="text" ref={input => this.veggieCondition = input} id="veggie-condition" name="veggie-condition" defaultValue={condition+""} />
							</div>
						</div>
						<div className="edit-veggie-form-elements row">
							<div className="col-4 veggie-input">
								<label htmlFor="veggie-picture" className="veggie-label">
									Picture URL: 
								</label>
								<input type="text" ref={input => this.veggiePictureUrl = input} id="veggie-picture" name="veggie-picture" defaultValue={pictureUrl+""} />
							</div>
						</div>
						<button type="submit" className="submit">Submit</button>
						<button type="button" className="cancel" onClick={() => this.onCancel()}>Cancel</button>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	veggieFocus: state.veggie.focus || null,
	plotFocus: state.plot.focus || null,
	newVeggie: state.veggie.isnew,
	editVeggie: state.veggie.isedit,
	possibleVeggies: state.veggie.possibleVeggies,
	index: state.veggie.index
});

export default connect(mapStateToProps)(VeggieForm);