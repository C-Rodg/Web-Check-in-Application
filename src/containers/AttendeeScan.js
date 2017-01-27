import React, { Component, PropTypes } from 'react';

import BackButton from '../components/BackButton';
import CameraBox from '../components/CameraBox';

class AttendeeScan extends Component {
	constructor(props, context) {
		super(props);
		this.handleScanData = this.handleScanData.bind(this);
		
		setTimeout(function(){
			window.scrollTo(0,0);	
		},0);
	}
	
	handleScanData(data) {
		this.context.router.push('/attendee/registrant/loading?badge=' + data);
	}

	render() {
		return (
			<div className="attendee-scan container-fluid">
				<BackButton />
				<div className="row">
					<div className="instruction-text col-xs-12">
						Please scan your QR code to load your record.
					</div>
				</div>
				<div className="row text-center atttendee-camera-box">
					<div className="col-xs-12 col-sm-6 offset-sm-3">
						<CameraBox onScanData={this.handleScanData} />
					</div>
				</div>
			</div>
		);
	}
}

AttendeeScan.contextTypes = {
	router : PropTypes.func.isRequired
};

export default AttendeeScan;