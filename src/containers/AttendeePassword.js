import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class AttendeePassword extends Component {
	constructor(props, context) {
		super(props);

		this.state = {
			pass : "",
			error : false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			pass : event.target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		
		if(this.state.pass === '9151') {
			this.context.router.push('/admin/results');
		} else {
			this.setState({
				error : true
			});
		}
	}

	render() {
		return (
			<div className="attendee-password container-fluid">
				<div className="row">
					<div className="instruction-text col-xs-12">
						Please enter your password.
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-6 offset-sm-3 text-center">
						{
							this.state.error ?
							<p className="password-error">Please try again...</p>
							: 
							""
						}
						<form className="attendee-password-form" onSubmit={this.handleSubmit} >
							<input type="password" className="attendee-form" onChange={this.handleChange} value={this.state.pass} />							
							<div className="password-btns">
								<Link to="/attendee/welcome" className="password-btn-cancel">
									Cancel
								</Link>
								<button type="submit" className="password-btn-submit">
									Continue
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

AttendeePassword.contextTypes = {
	router : PropTypes.func.isRequired
};