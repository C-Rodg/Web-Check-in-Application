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
			<div>
				<p>Admin Scan Page</p>
				<button onClick={this.cameraOn}>Toggle Camera</button>
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