import React, { Component } from 'react';

import WalkInForm from './WalkInForm';
import BackButton from '../components/BackButton';

export default class AttendeeWalkIn extends Component {
	constructor(props) {
		super(props);		
	}

	render() {
		return (
			<div className="attendee-walkin container-fluid">							
				<BackButton />
				<div className="row">
					<div className="instruction-text col-xs-12">
						Please fill out your information to check-in.
					</div>
				</div>
				<div className="row">
					<WalkInForm />
				</div>
			</div>
		);
	}
}