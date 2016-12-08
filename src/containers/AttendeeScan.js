import React, { Component } from 'react';

import BackButton from '../components/BackButton';

export default class AttendeeScan extends Component {
	render() {
		return (
			<div className="attendee-scan container-fluid">
				<BackButton />
				<div className="row">
					<div className="instruction-text col-xs-12">
						Please scan your QR code to load your record.
					</div>
				</div>
				<div className="row">

				</div>
			</div>
		);
	}
}