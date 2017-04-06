import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getEventSettings } from '../actions/cc_settings';
import { clearAllSearching } from '../actions/cc_registrant';
import NotificationBar from '../components/NotificationBar';

class RootAttendee extends Component {
	constructor(props) {
		super(props);
	}

	// Try to update event settings
	componentDidMount() {
		this.props.getEventSettings();
	}

	// Clear searches when leaving
	componentWillUnmount() {
		this.props.clearAllSearching();
	}

	render(){
		return (
			<div className="root-attendee">
				<h1 className="welcome-text text-center">
					Welcome.				
				</h1>

				{this.props.children}							

				<div className="attendee-footer container-fluid clearfix">
					<NotificationBar text={this.props.notifyText} counter={this.props.notifyCount} typeSuccess={this.props.notifyType}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { notificationText, notificationCount, notificationSuccess } = state.registrant;
	return {
		notifyText : notificationText,
		notifyCount : notificationCount,
		notifyType : notificationSuccess
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getEventSettings : () => dispatch(getEventSettings()),
		clearAllSearching : () => dispatch(clearAllSearching())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RootAttendee);