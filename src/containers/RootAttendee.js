import React, { Component } from 'react';
import { Link } from 'react-router';

export default class RootAttendee extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<div className="root-attendee">
				<h1 className="welcome-text text-center">
					Welcome.				
				</h1>
				{this.props.children}
				
				<Link to="/attendee/password" className="attendee-password-btn">

				</Link>
			</div>
		);
	}
}