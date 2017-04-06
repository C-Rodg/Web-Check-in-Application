import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdminHeader from '../components/AdminHeader';
import AdminControls from './AdminControls';
import AdminFooter from '../components/AdminFooter';

import { getEventSettings, getEventInformation, getRegistrationStats, listGrantedFeatures } from '../actions/cc_settings';
import { searchRegistrants, clearAllSearching } from '../actions/cc_registrant';

class RootAdmin extends Component {
	constructor(props) {
		super(props);

		this.handleSearchRegistrants = this.handleSearchRegistrants.bind(this);
		this._getStatsTimer = null;
	}

	// Update event settings, event information, registration stats, granted features, continually ping for updates to stats
	componentDidMount() {	
		this.props.getEventSettings();	
		this.props.getEventInformation();
		this.props.getRegistrationStats();
		this.props.listGrantedFeatures();

		this._getStatsTimer = setInterval(() => {
			this.props.getRegistrationStats();
		}, 90000);
	}

	// Clear searches and timer when leaving
	componentWillUnmount() {
		this.props.clearAllSearching();
		clearInterval(this._getStatsTimer);
	}

	// Search for registrants from admin mode
	handleSearchRegistrants(val) {
		// Dispatch registrant search from Admin
		this.props.searchRegistrants(val, 'all');
	}

	render(){
		return (
			<div className="root-admin">
				<AdminHeader 
					eventName={this.props.eventName} 
					checkedInNum={this.props.statsCheckedIn || 0} 
					registeredNum={this.props.statsRegistered || 0} 					
				/>
				<div className="admin-body container-fluid clearfix">
					<AdminControls handleSearchRegistrants={this.handleSearchRegistrants} />
					<div className="card-body row">
						{this.props.children}
					</div>
				</div>
				<AdminFooter 
					online={this.props.seatGuid} 
					notifyText={this.props.notifyText} 
					notifyCounter={this.props.notifyCounter} 
					notifyType={this.props.notifyType} 
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { settings: { eventName, stats, seatGuid }, registrant } = state;
	return {
		eventName : eventName,		
		statsCheckedIn : stats.totalAttended,
		statsRegistered : stats.totalRegistered,
		notifyText : registrant.notificationText,
		notifyCounter : registrant.notificationCount,
		notifyType : registrant.notificationSuccess,
		seatGuid : seatGuid
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getEventSettings : () => dispatch(getEventSettings()),
		getEventInformation : () => dispatch(getEventInformation()),
		searchRegistrants : (q, f) => dispatch(searchRegistrants(q, f)),
		getRegistrationStats : () => dispatch(getRegistrationStats()),
		clearAllSearching : () => dispatch(clearAllSearching()),
		listGrantedFeatures : () => dispatch(listGrantedFeatures())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RootAdmin);