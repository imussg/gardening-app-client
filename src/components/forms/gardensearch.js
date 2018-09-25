import React from 'react';
import { connect } from 'react-redux';

// import Input from './input';
import { createGarden, findGarden } from '../../actions/garden';

export class GardensearchForm extends React.Component {

	componentDidMount() {
		this.gardenName.focus();
	}

	onSubmit(event) {
		event.preventDefault();
		const name = this.gardenName.value.trim();
		this.props.dispatch(findGarden(name));
	}

	onSubmitNew(event) {
		const name = this.gardenName.value.trim();
		const garden = {
			name
		};
		this.props.dispatch(createGarden(garden));
	}

	render() {

		// let successMessage;
        // let errorMessage = this.props.error ? (<div className="garden-error">
        // 	{this.props.error}
        // </div>) : '';
        // if(!this.props.error && this.props.garden) {
        // 	successMessage = (<div className="garden-success">
        // 		{"Garden successfully loaded"}
        // 	</div>);
        // }

        return (
			<form className="garden-name-form" onSubmit={event => this.onSubmit(event)}>
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
		            	type="button"
		            	onClick={event => this.onSubmitNew(event)} >
		            	Add New
		            </button>
		        </div>
	        </form>
	    );
	}
}

const mapStateToProps = state => ({
	garden: state.garden.garden,
	error: state.garden.error
});

export default connect(mapStateToProps)(GardensearchForm);