import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdminHeader from '../components/AdminHeader';
import AdminControls from './AdminControls';
import AdminFooter from '../components/AdminFooter';

import { getEventInformation } from '../actions/cc_settings';

class RootAdmin extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {		
		this.props.getEventInformation();
	}

	render(){
		return (
			<div className="root-admin">
				<AdminHeader eventName={this.props.eventName} checkedInNum={129} registeredNum={1035} eventDate={this.props.eventDate} eventLocation={this.props.eventLocation}/>
				<div className="admin-body container-fluid">
					<AdminControls />
					<div className="card-body row">
						{this.props.children}
					</div>
				</div>
				<AdminFooter username={"bsimmons@validar.com"} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		eventName : state.settings.eventName,
		eventDate : state.settings.eventDate,
		eventLocation : state.settings.eventLocation
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		getEventInformation : data => dispatch(getEventInformation(data))
	};
};

export default connect(null, mapDispatchToProps)(RootAdmin);