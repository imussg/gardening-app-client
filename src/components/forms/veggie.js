import React from 'react';
import { connect } from 'react-redux';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';

import { sendEditVeggie, sendNewVeggie, focusVeggie, unfocusVeggie } from '../../actions/veggie';

export class VeggieForm extends React.Component {

	onEditSubmit(event) {
		event.preventDefault();
		const veggieName = this.veggieName.value;
		const veggieCondition = this.veggieCondition.value;
		const veggiePictureUrl = this.veggiePictureUrl.value;
		const veggiePictureAlt = `${veggieName}-pic`;
		const editedVeggie = {
			plotId: this.props.plotFocus.id,
			name: veggieName,
			condition: veggieCondition,
			pictureUrl: veggiePictureUrl,
			pictureAlt: veggiePictureAlt
		};
		if(this.props.editVeggie) {
			this.props.dispatch(sendEditVeggie(editedVeggie));
		} else {
			this.props.dispatch(sendNewVeggie(editedVeggie));
		}
	}

	onCancel() {
		this.props.dispatch(unfocusVeggie());
	}

	render() {
		let name = "", condition = "", pictureUrl = "";
		if(this.props.editVeggie) {
			name = this.props.veggieFocus.name;
			condition = this.props.veggieFocus.condition;
			pictureUrl = this.props.veggieFocus.pictureUrl;
		}

		return (
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
		);
	}
}

const mapStateToProps = state => ({
	veggieFocus: state.veggie.focus || null,
	plotFocus: state.plot.focus || null,
	newVeggie: state.veggie.isnew,
	editVeggie: state.veggie.isedit
});

export default connect(mapStateToProps)(VeggieForm);