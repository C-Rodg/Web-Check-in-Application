import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdminHeader from '../components/AdminHeader';
import AdminControls from './AdminControls';
import AdminFooter from '../components/AdminFooter';

import { getEventInformation, getRegistrationStats } from '../actions/cc_settings';
import { searchRegistrants } from '../actions/cc_registrant';

class RootAdmin extends Component {
	constructor(props) {
		super(props);

		this.handleSearchRegistrants = this.handleSearchRegistrants.bind(this);
	}

	componentDidMount() {		
		this.props.getEventInformation();
		this.props.getRegistrationStats();
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
				<AdminFooter />
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
		statsRegistered : state.settings.stats.totalRegistered
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		getEventInformation : () => dispatch(getEventInformation()),
		searchRegistrants : (q, f) => dispatch(searchRegistrants(q, f)),
		getRegistrationStats : () => dispatch(getRegistrationStats())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RootAdmin);