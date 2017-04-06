import React, { Component, PropTypes } from 'react';
import CameraBox from '../components/CameraBox';

class AdminScan extends Component {
	constructor(props, context){
		super(props);						
		this.handleScanData = this.handleScanData.bind(this);
	}

	// Push registrant route
	handleScanData(data) {
		this.context.router.push('/admin/registrant/loading?badge=' + data);
	}

	render(){
		return (
			<div className="admin-scan text-center">				
				<CameraBox onScanData={this.handleScanData} />
			</div>
		);
	}
}

AdminScan.contextTypes = {
	router : PropTypes.func.isRequired
};

export default AdminScan;