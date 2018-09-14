import React from 'react';
import { connect } from 'react-redux';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';

import { sendEditVeggie, focusVeggie } from '../../actions/garden';

export class VeggieForm extends React.Component {

	onEditSubmit(event) {
		event.preventDefault();
		const veggieName = this.veggieName.value;
		const veggieCondition = this.veggieCondition.value;
		const veggiePictureUrl = this.veggiePictureUrl.value;
		const veggiePictureAlt = `${veggieName}-pic`;
		const editedVeggie = {
			id: this.props.veggieFocus.id,
			name: veggieName,
			condition: veggieCondition,
			pictureUrl: veggiePictureUrl,
			pictureAlt: veggiePictureAlt
		};
		this.props.dispatch(sendEditVeggie(editedVeggie));
	}

	onCancel(event) {
		this.props.dispatch(focusVeggie(null));
	}

	render() {
		if(this.props.editVeggie) {
			let name = this.props.veggieFocus.name;
			let condition = this.props.veggieFocus.condition;
			let pictureUrl = this.props.veggieFocus.pictureUrl;
			return (
				<form className="edit-veggie" onSubmit={(event) => this.onEditSubmit(event)} >
					<div className="edit-veggie-form-elements row">
						<div className="col-4 veggie-name-input">
							<input type="text" ref={input => this.veggieName = input} id="veggie-name" name="veggie-name" defaultValue={name+""} />
						</div>
					</div>
					<div className="edit-veggie-form-elements row">
						<div className="col-4 veggie-condition-input">
							<input type="text" ref={input => this.veggieCondition = input} id="veggie-condition" name="veggie-condition" defaultValue={condition+""} />
						</div>
					</div>
					<div className="edit-veggie-form-elements row">
						<div className="col-4 veggie-picture-input">
							<input type="text" ref={input => this.veggiePictureUrl = input} id="veggie-picture" name="veggie-picture" defaultValue={pictureUrl+""} />
						</div>
					</div>
				</form>
			);
		} else {
			return <form></form>;
		}
	}
}

const mapStateToProps = state => ({
	veggieFocus: state.veggieFocus ? state.veggieFocus : null,
	plotFocus: state.plotFocus ? state.plotFocus : null,
	newVeggie: state.newVeggie
});

export default connect(mapStateToProps)(VeggieForm);