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
		this.toggleFullscreenMode = this.toggleFullscreenMode.bind(this);
		this.setCustomSettings = this.setCustomSettings.bind(this);
		this.goToRandom = this.goToRandom.bind(this);	
	}

	onStationChange(event) {
		this.setState({
			stationName: event.target.value
		});
		window.localStorage.setItem('stationName', (event.target.value) || "");
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

	setCustomSettings(item, val) {
		window.localStorage.setItem('customSettings', 'TRUE');
		window.localStorage.setItem(item, val);
	}

	goToRandom() {

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
					<div className="form-group">
						<label>Find a Random Registrant</label>
						<button className="btn-flat border-0 settings-btn inline-btn" onClick={this.goToRandom}><i className="material-icons">shuffle</i> <span>Random Registrant</span></button>
					</div>
				</div>								
				<div className="col-xs-12 col-sm-6">
					<div className={"form-group search-" + this.props.attendeeConfig.Search}>
						<label>Searching - Attendee Mode</label>
						<button className="btn-flat border-0 settings-btn inline-btn btn-on" onClick={() => {this.setCustomSettings('search', 'TRUE')}}><span>Search On</span></button>
						<button className="btn-flat border-0 settings-btn inline-btn btn-off" onClick={() => {this.setCustomSettings('search', 'FALSE')}}><span>Search Off</span></button>
					</div>
				</div>
				<div className="col-xs-12 col-sm-6">
					<div className={"form-group scan-" + this.props.attendeeConfig.Scan}>
						<label>Scanning - Attendee Mode</label>
						<button className="btn-flat border-0 settings-btn inline-btn btn-on" onClick={() => {this.setCustomSettings('scan', 'TRUE')}}><span>Scanning On</span></button>
						<button className="btn-flat border-0 settings-btn inline-btn btn-off" onClick={() => {this.setCustomSettings('scan', 'FALSE')}}><span>Scanning Off</span></button>
					</div>
				</div>
				<div className="col-xs-12 col-sm-6">
					<div className={"form-group walkins-" + this.props.attendeeConfig.WalkIns}>
						<label>Walk-ins - Attendee Mode</label>
						<button className="btn-flat border-0 settings-btn inline-btn btn-on" onClick={() => {this.setCustomSettings('walkIns', 'TRUE')}}><span>Allow Walk-ins</span></button>
						<button className="btn-flat border-0 settings-btn inline-btn btn-off" onClick={() => {this.setCustomSettings('walkIns', 'FALSE')}}><span>No Walk-ins</span></button>
					</div>
				</div>
				<div className="col-xs-12 col-sm-6">
					<div className={"form-group " + this.props.attendeeConfig.SearchBy}>
						<label>Search By - Attendee Mode</label>
						<button className="btn-flat border-0 settings-btn inline-btn btn-last" onClick={() => {this.setCustomSettings('searchBy', 'lastname')}}><span>Last Name</span></button>
						<button className="btn-flat border-0 settings-btn inline-btn btn-email" onClick={() => {this.setCustomSettings('searchBy', 'email')}}><span>Email</span></button>
						<button className="btn-flat border-0 settings-btn inline-btn btn-both" onClick={() => {this.setCustomSettings('searchBy', 'both')}}><span>Both</span></button>
					</div>
				</div>
				<div className="col-xs-12 col-sm-6">
					<div className="form-group force-fullscreen-group">
						<label>Toggle Fullscreen (non-iOS)</label>
						<button className="btn-flat border-0 settings-btn inline-btn" onClick={this.toggleFullscreenMode} ><i className="material-icons">zoom_out_map</i> <span>Fullscreen Mode</span></button>
					</div>
				</div>				
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		attendeeConfig : state.settings.configuration.AttendeeMode
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		sendNotification : (msg, isSuccess) => dispatch(sendNotification(msg, isSuccess))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSettings);