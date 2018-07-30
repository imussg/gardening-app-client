import React from 'react';
import { connect } from 'react-redux';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';

import Input from './input';
import { findGarden } from '../actions/garden';

export class GardensearchForm extends React.Component {

	onSubmit(event) {
		event.preventDefault();
		const name = this.gardenName.value.trim();
		this.props.dispatch(findGarden(name));
	}

	render() {

		let successMessage;
  //       if (this.props.submitSucceeded) {
  //           successMessage = (
  //               <div className="message message-success">
  //                   Message submitted successfully
  //               </div>
  //           );
  //       }

        let errorMessage = this.props.error ? this.props.error : '';
  //       if (this.props.error) {
  //           errorMessage = (
  //               <div className="message message-error">{this.props.error}</div>
  //           );
  //       }
        return (
			<form className="garden-name-form" onSubmit={event => this.onSubmit(event)}>
	            {successMessage}
	            {errorMessage}
	            <label htmlFor="garden-name">Garden Name</label>
	            <input type="text" ref={input => this.gardenName = input} id="garden-name" placeholder="enter name of garden"/>
	            <div className="action-buttons row">
		            <button
		            	className="blue"
		            	id="submit-garden-name"
		                type="submit">
		                Submit
		            </button>
		            <button
		            	className="green"
		            	id="add-new-garden"
		            	type="button">
		            	Add New
		            </button>
		        </div>
	        </form>
	    );
	}
}

const mapStateToProps = state => ({
	error: state.error
});

export default connect(mapStateToProps)(GardensearchForm);