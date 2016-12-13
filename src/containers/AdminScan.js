import React, { Component } from 'react';
import { connect } from 'react-redux';

import { turnCameraOn } from '../actions/camera';

class AdminScan extends Component {
	constructor(props){
		super(props);

		this.cameraOn = this.cameraOn.bind(this);
	}

	cameraOn(){
		this.props.turnCameraOn('test');
	}

	render(){
		return (
			<div className="admin-scan text-center">
				<div className="scan-camera-box">
					<i className="material-icons scan-icon">filter_center_focus</i>
					<div className="scan-text">Scan</div>
				</div>			
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		turnCameraOn : data => dispatch(turnCameraOn(data))
	};
};

export default connect(null, mapDispatchToProps)(AdminScan);