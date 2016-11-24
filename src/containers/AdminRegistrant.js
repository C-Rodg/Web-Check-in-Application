import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadRegistrantByAttendeeGuid, clearCurrentRegistrant } from '../actions/cc_registrant';

class AdminRegistrant extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(){		
		this.props.loadRegistrantByGuid(this.props.params.atGuid);
	}

	componentWillUnmount(){
		this.props.clearCurrentRegistrant();
	}

	render(){
		if(!this.props.registrant){
			return (<div className="loading loading-registrant">Loading...</div>);
		}
		return (
			<div className="admin-registrant text-center">
				<div className="admin-info col-xs-12">
					<div className="registrant-name f-s-44">{this.props.registrant.FirstName + " " + this.props.registrant.LastName}</div>
					<div className="registrant-company f-s-24 other-info">{this.props.registrant.Company}</div>
					<div className="registrant-email f-s-24 other-info">{this.props.registrant.Email}</div>
					<div className="registrant-atType f-s-24 other-info">{this.props.registrant.AttendeeType}</div>
				</div>
				<div className="registrant-checkin">
					<button className="registrant-checkin-btn btn-full btn-large btn-none b-t-light btn-col-green m-t-15">Check-in <i className="material-icons">done</i></button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		registrant : state.registrant.currentRegistrant
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadRegistrantByGuid : (guid) => dispatch(loadRegistrantByAttendeeGuid(guid)),
		clearCurrentRegistrant : () => dispatch(clearCurrentRegistrant())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminRegistrant);