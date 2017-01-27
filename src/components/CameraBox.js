import React, { Component } from 'react';
import axios from 'axios';
 
export default class CameraBox extends Component {
	constructor(props) {
		super(props);
		let cameraFront = window.localStorage.getItem('cameraFront');
		if(cameraFront === 'TRUE'){
			cameraFront = true;
		} else {
			cameraFront = false;
		}
		this.state = {
			frontCamera : cameraFront,
			cameraError : false
		};

		this.turnOnOffCamera = this.turnOnOffCamera.bind(this);
		this.switchCamera = this.switchCamera.bind(this);
		this.recalibrateCameraBox = this.recalibrateCameraBox.bind(this);
		this.parseBadgeData = this.parseBadgeData.bind(this);

		window.addEventListener('orientationchange', this.recalibrateCameraBox);
		window.addEventListener('scroll', this.recalibrateCameraBox);
		window.OnBarCodeRead = this.parseBadgeData;		
	}

	parseBadgeData(data) {
		if(data != null){
			let badgeId = "";
			// Validar QR Code			
			if(data.substring(0,4) == "VQC:") {
				let scannedData = data.substring(4);
				let scannedFields = scannedData.split(";");
				if(scannedFields != null) {
					for(let i = 0, j = scannedFields.length ; i < j ; i++) {
						let field = scannedFields[i].split(":");
						if(field != null && field.length > 0) {
							if(field[0] == "ID") {
								badgeId = field[1];
							}
						}
					}
				}
			} 
			// try to just load any data as BadgeId
			else {
				badgeId = data;
			}

			this.props.onScanData(badgeId);
		}
		
	}

	recalibrateCameraBox() {
		this.turnOnOffCamera(true);		
	}

	componentDidMount() {
		this.turnOnOffCamera(true);
	}

	componentWillUnmount(){
		this.turnOnOffCamera(false);
		window.removeEventListener('orientationchange', this.recalibrateCameraBox);
		window.removeEventListener('scroll', this.recalibrateCameraBox);
		window.OnBarCodeRead = null;
	}

	turnOnOffCamera(status) {
		try {				
			if(!status){
				axios.post('https://localhost/ShowBarCodeReader', 'OFF');				
			} else {
				let box = document.getElementById('admin-camera-box');
				let dimensions = box.getBoundingClientRect();
				let direction = this.state.frontCamera ? 'C:F' : 'C:R';				
				let loc = `ON;Y:${dimensions.top+15};X:${dimensions.left+15};W:180;H:180;${direction}`;
				axios.post('https://localhost/ShowBarCodeReader', loc).catch((err) => {this.setState({cameraError : true})});
			}
		} catch(err) {
			this.setState({cameraError: true});
		}
	}

	switchCamera(){
		this.setState({
			frontCamera : !this.state.frontCamera
		}, this.turnOnOffCamera(true));
	}

	render() {
		return (
			<div className="camera-box">
				<div className="scan-camera-box" id="admin-camera-box">
					<i className="material-icons scan-icon">camera</i>					
				</div>
				<div className="scan-switch">
					{
						!this.state.cameraError ? 
						<button className="btn-flat border-0 inline-btn switch-camera-btn" onClick={this.switchCamera}>
							<i className="material-icons">switch_camera</i>
							<span>Switch Camera</span>
						</button> :
						<span className="camera-error-text">Uh-Oh! It appears scanning isn't available on this device...</span>
					}
					
				</div>
			</div>
		);
	}
}