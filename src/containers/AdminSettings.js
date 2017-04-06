import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getEventSettings } from '../actions/cc_settings';
import { getRandomRegistrant, sendNotification, navigateToListView } from '../actions/cc_registrant';

class AdminSettings extends Component {
	constructor(props, context) {
		super(props);

		let stationName = window.localStorage.getItem('stationName') || "";		
		let searchBy = props.attendeeConfig.SearchBy;
		let search = props.attendeeConfig.Search;
		let scan = props.attendeeConfig.Scan;
		let walkIns = props.attendeeConfig.WalkIns;
		let cameraFront = window.localStorage.getItem('cameraFront');
		let sms = props.smsEnabled;
		this.state = {
			stationName,
			searchBy,
			search,
			scan, 
			walkIns,
			cameraFront,
			sms
		};
		this.onStationChange = this.onStationChange.bind(this);
		this.toggleFullscreenMode = this.toggleFullscreenMode.bind(this);
		this.setCustomSettings = this.setCustomSettings.bind(this);
		this.goToRandom = this.goToRandom.bind(this);
		this.returnToListView = this.returnToListView.bind(this);			
		this.setCameraMode = this.setCameraMode.bind(this);
		this.navigateToSeatManager = this.navigateToSeatManager.bind(this);
	}

	// If receiveing an event config, update the UI
	componentWillReceiveProps(nextProps) {
		if(nextProps.attendeeConfig) {
			let searchBy = nextProps.attendeeConfig.SearchBy,
				scan = nextProps.attendeeConfig.Scan,
				search = nextProps.attendeeConfig.Search,
				walkIns = nextProps.attendeeConfig.WalkIns,
				sms = nextProps.smsEnabled;			

				this.setState({
					searchBy,
					scan,
					search,
					walkIns,
					sms
				});
		}				
	}

	// Update/save event settings
	componentWillUnmount() {
		this.props.getEventSettings();
	}

	// Update station name
	onStationChange(event) {
		this.setState({
			stationName: event.target.value
		});
		window.localStorage.setItem('stationName', (event.target.value) || "");
	}

	// Toggle fullscreen mode
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

	// Set camera mode
	setCameraMode(val) {
		window.localStorage.setItem('cameraFront', val);
		this.setState({
			cameraFront : val
		});
	}

	// Set custom settings
	setCustomSettings(item, val) {
		window.localStorage.setItem('customSettings', 'TRUE');
		window.localStorage.setItem(item, val);
		let stateVal;
		if(val === "TRUE"){
			stateVal = true;
		} else if (val === 'FALSE') {
			stateVal = false;
		} else {
			stateVal = val;
		}
		let obj = {};
		obj[item] = stateVal;
		this.setState(obj);
	} 

	// Go to random registrant
	goToRandom() {
		this.props.getRandomRegistrant(true).then((resp) => {
			this.context.router.push('/admin/registrant/' + resp.data.d.Registrants[0].AttendeeGuid );
		}).catch((err) => {
			this.props.sendNotification("There was an issue finding a random registrant.", false);
		});
	}

	// Go back to list view
	returnToListView() {
		this.props.navigateToListView();
	}

	// Go to Seat Manager
	navigateToSeatManager() {
		this.context.router.push('/admin/seats');
	}

	// Check if this app has feature
	checkFeatureAccess(featureName) {
		const hasFeature = this.props.featureList.find((feature) => {
			return feature.Accessible && feature.Feature === featureName;
		});
		return hasFeature ? true : false;
	}

	render() {
		const canAccessSeats = this.checkFeatureAccess('CanGetSeatUsage');
		const canFindRandom = this.checkFeatureAccess('CanListRandomRegistrant');
		const canSendSMS = this.checkFeatureAccess('CanSendSmsMessage');

		return (
			<div className="admin-settings">
				<div className="settings-box col-xs-12 col-sm-6">
					<div className="form-group station-name-group">
						<label for="stationName">Station Name</label>
						<input className="form-control" type="text"
							placeholder="Enter a station name.."
							onChange={this.onStationChange}
							value={this.state.stationName}
						/>
					</div>				
				</div>
				<div className="settings-box col-xs-12 col-sm-6">
					<div className="form-group station-name-group">
						<label for="stationName">Client Guid</label>
						<input className="form-control" type="text"	disabled value={this.props.seatGuid} />
					</div>				
				</div>
				<div className="settings-box col-xs-12 col-sm-6">
					<div className="form-group force-fullscreen-group">
						<label>Return to Event List</label>
						<button className="btn-flat border-0 settings-btn inline-btn" onClick={this.returnToListView}><i className="material-icons">list</i> <span>List Events</span></button>
					</div>
				</div>
											
				<div className="settings-box col-xs-12 col-sm-6">
					<div className={"form-group settings-" + (this.state.search ? "on" : "off")}>
						<label>Searching - Attendee Mode</label>
						<button className="btn-flat border-0 settings-btn inline-btn btn-on" onClick={() => {this.setCustomSettings('search', 'TRUE')}}><span>Search On</span></button>
						<button className="btn-flat border-0 settings-btn inline-btn btn-off" onClick={() => {this.setCustomSettings('search', 'FALSE')}}><span>Search Off</span></button>
					</div>
				</div>
				<div className="settings-box col-xs-12 col-sm-6">
					<div className={"form-group settings-" + (this.state.scan ? "on" : "off")}>
						<label>Scanning - Attendee Mode</label>
						<button className="btn-flat border-0 settings-btn inline-btn btn-on" onClick={() => {this.setCustomSettings('scan', 'TRUE')}}><span>Scanning On</span></button>
						<button className="btn-flat border-0 settings-btn inline-btn btn-off" onClick={() => {this.setCustomSettings('scan', 'FALSE')}}><span>Scanning Off</span></button>
					</div>
				</div>
				<div className="settings-box col-xs-12 col-sm-6">
					<div className={"form-group settings-" + (this.state.walkIns ? "on" : "off")}>
						<label>Walk-ins - Attendee Mode</label>
						<button className="btn-flat border-0 settings-btn inline-btn btn-on" onClick={() => {this.setCustomSettings('walkIns', 'TRUE')}}><span>Allow Walk-ins</span></button>
						<button className="btn-flat border-0 settings-btn inline-btn btn-off" onClick={() => {this.setCustomSettings('walkIns', 'FALSE')}}><span>No Walk-ins</span></button>
					</div>
				</div>
				<div className="settings-box col-xs-12 col-sm-6">
					<div className={"form-group settings-" + this.state.searchBy}>
						<label>Search By - Attendee Mode</label>
						<button className="btn-flat border-0 settings-btn inline-btn lastname-btn" onClick={() => {this.setCustomSettings('searchBy', 'lastname')}}><span>Last Name</span></button>
						<button className="btn-flat border-0 settings-btn inline-btn email-btn" onClick={() => {this.setCustomSettings('searchBy', 'email')}}><span>Email</span></button>
						<button className="btn-flat border-0 settings-btn inline-btn both-btn" onClick={() => {this.setCustomSettings('searchBy', 'both')}}><span>Both</span></button>
					</div>
				</div>
				<div className={"settings-box col-xs-12 col-sm-6 " + (canFindRandom ? "" : " hidden")}>
					<div className="form-group">
						<label>Find a Random Registrant</label>
						<button className="btn-flat border-0 settings-btn inline-btn" onClick={this.goToRandom}><i className="material-icons">shuffle</i> <span>Random Registrant</span></button>
					</div>
				</div>	
				<div className="settings-box col-xs-12 col-sm-6">
					<div className={"form-group settings-" + (this.state.cameraFront === "TRUE" ? "on" : "off")}>
						<label>Camera Facing</label>
						<button className="btn-flat border-0 settings-btn inline-btn btn-on" onClick={() => {this.setCameraMode("TRUE")}}><span>Front</span></button>
						<button className="btn-flat border-0 settings-btn inline-btn btn-off" onClick={() => {this.setCameraMode("FALSE")}}><span>Back</span></button>
					</div>
				</div>
				<div className={"settings-box col-xs-12 col-sm-6 " + (canSendSMS ? "" : " hidden ")}>
					<div className={"form-group settings-" + (this.state.sms ? "on" : "off")}>
						<label>SMS alerts</label>
						<button className="btn-flat border-0 settings-btn inline-btn btn-on" onClick={() => {this.setCustomSettings('sms', "TRUE")}}><span>Enabled</span></button>
						<button className="btn-flat border-0 settings-btn inline-btn btn-off" onClick={() => {this.setCustomSettings('sms', "FALSE")}}><span>Disabled</span></button>
					</div>
				</div>
				<div className="settings-box col-xs-12 col-sm-6">
					<div className="form-group">
						<label>Reset Event Settings</label>
						<button className="btn-flat border-0 settings-btn inline-btn" onClick={()=>{window.location.reload()}}><i className="material-icons">refresh</i> <span>Restore to Default</span></button>
					</div>
				</div>
				<div className={"settings-box col-xs-12 col-sm-6 " + (canAccessSeats ? "" : " hidden")}>
					<div className="form-group">
						<label>Device Control</label>
						<button className="btn-flat border-0 settings-btn inline-btn" onClick={this.navigateToSeatManager} ><i className="material-icons">event_seat</i> <span>Seat Manager</span></button>
					</div>
				</div>				
				<div className="settings-box col-xs-12 col-sm-6">
					<div className="form-group force-fullscreen-group">
						<label>Toggle Fullscreen (non-iOS)</label>
						<button className="btn-flat border-0 settings-btn inline-btn" onClick={this.toggleFullscreenMode} ><i className="material-icons">zoom_out_map</i> <span>Fullscreen Mode</span></button>
					</div>
				</div>				
			</div>
		);
	}
}

AdminSettings.contextTypes = {
	router : PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	const { settings, settings: { configuration } } = state;
	return {
		attendeeConfig : configuration.AttendeeMode,
		seatGuid : settings.seatGuid,
		featureList : settings.featureList,
		smsEnabled : configuration.SMS.Enabled
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getEventSettings : () => dispatch(getEventSettings()),
		getRandomRegistrant : (isAttended) => dispatch(getRandomRegistrant(isAttended)),
		sendNotification : (msg, isSuccess) => dispatch(sendNotification(msg, isSuccess)),
		navigateToListView : () => dispatch(navigateToListView())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminSettings);