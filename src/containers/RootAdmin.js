import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdminHeader from '../components/AdminHeader';
import AdminControls from './AdminControls';
import AdminFooter from '../components/AdminFooter';

import { getEventSettings, getEventInformation, getRegistrationStats } from '../actions/cc_settings';
import { searchRegistrants, clearAllSearching } from '../actions/cc_registrant';

class RootAdmin extends Component {
	constructor(props) {
		super(props);

		this.handleSearchRegistrants = this.handleSearchRegistrants.bind(this);
	}

	componentDidMount() {	
		this.props.getEventSettings();	
		this.props.getEventInformation();
		this.props.getRegistrationStats();
	}

	componentWillUnmount() {
		this.props.clearAllSearching();
	}

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
					eventDate={this.props.eventDate} 
					eventLocation={this.props.eventLocation}
				/>
				<div className="admin-body container-fluid clearfix">
					<AdminControls handleSearchRegistrants={this.handleSearchRegistrants} />
					<div className="card-body row">
						{this.props.children}
					</div>
				</div>
				<AdminFooter notifyText={this.props.notifyText} notifyCounter={this.props.notifyCounter} notifyType={this.props.notifyType} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		eventName : state.settings.eventName,
		eventDate : state.settings.eventDate,
		eventLocation : state.settings.eventLocation,
		statsCheckedIn : state.settings.stats.totalAttended,
		statsRegistered : state.settings.stats.totalRegistered,
		notifyText : state.registrant.notificationText,
		notifyCounter : state.registrant.notificationCount,
		notifyType : state.registrant.notificationSuccess
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getEventSettings : () => dispatch(getEventSettings()),
		getEventInformation : () => dispatch(getEventInformation()),
		searchRegistrants : (q, f) => dispatch(searchRegistrants(q, f)),
		getRegistrationStats : () => dispatch(getRegistrationStats()),
		clearAllSearching : () => dispatch(clearAllSearching())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RootAdmin);