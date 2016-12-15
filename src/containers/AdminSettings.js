import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sendNotification } from '../actions/cc_registrant';

class AdminSettings extends Component {
	constructor(props) {
		super(props);
		let stationName = window.localStorage.getItem('stationName') || "";
		this.state = {
			stationName
		};
		this.onStationChange = this.onStationChange.bind(this);
		this.saveSettings = this.saveSettings.bind(this);
		this.toggleFullscreenMode = this.toggleFullscreenMode.bind(this);
	}

	onStationChange(event) {
		this.setState({
			stationName: event.target.value
		});
	}

	saveSettings() {
		window.localStorage.setItem('stationName', (this.state.stationName || ""));	
		this.props.sendNotification('Settings saved!', true);
	}

	toggleFullscreenMode() {
		let doc = window.document;
		let docEl = doc.documentElement;

		let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
		let cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
		if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
			requestFullScreen.call(docEl);
		} else {
			cancelFullScreen.call(doc);
		}
	}

	render() {
		return (
			<div className="admin-settings">
				<div className="col-xs-12 col-sm-6">
					<div className="form-group station-name-group">
						<label for="stationName">Station Name</label>
						<input className="form-control" type="text"
							placeholder="Enter a station name.."
							onChange={this.onStationChange}
							value={this.state.stationName}
						/>
					</div>				
				</div>
				<div className="col-xs-12 col-sm-6">
					<div className="form-group force-fullscreen-group">
						<label>Toggle Fullscreen</label>
						<button className="btn-flat border-0 settings-btn inline-btn" onClick={this.toggleFullscreenMode} ><i className="material-icons">zoom_out_map</i> <span>Fullscreen Mode</span></button>
					</div>
				</div>

				<div className="registrant-checkin">
					<button className="registrant-checkin-btn btn-full btn-large btn-none b-t-light btn-col-green"
						onClick={this.saveSettings}>
					Save
					</button>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		sendNotification : (msg, isSuccess) => dispatch(sendNotification(msg, isSuccess))
	};
}

export default connect(null, mapDispatchToProps)(AdminSettings);