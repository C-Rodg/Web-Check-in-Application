import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadRegistrantByAttendeeGuid, clearCurrentRegistrant, upsertRegistrant } from '../actions/cc_registrant';
import Loading from '../components/Loading';

class AdminRegistrant extends Component {
	constructor(props) {
		super(props);

		this.checkInOutRegistrant = this.checkInOutRegistrant.bind(this);
	}

	componentDidMount(){		
		this.props.loadRegistrantByGuid(this.props.params.atGuid);
	}

	componentWillUnmount(){
		this.props.clearCurrentRegistrant();
	}

	checkInOutRegistrant(){
		const Attended = this.props.registrant.Attended ? false : true;
		const FirstCheckInDateTime = Attended ? new Date() : null;
		const registrant = Object.assign({}, this.props.registrant, {
			Attended,
			FirstCheckInDateTime
		});
		console.log(registrant);
		this.props.upsertCurrentRegistrant(registrant);
	}

	render(){
		if(!this.props.registrantError && !this.props.registrant) {
			return (<Loading height={112} width={112} />);
		}
		if(this.props.registrantError){
			return (<div className="error-text">Uh-oh! There was an issue loading that record...</div>);
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
					{ !this.props.registrant.Attended ? 
						<button className="registrant-checkin-btn btn-full btn-large btn-none b-t-light btn-col-green m-t-15"
							onClick={this.checkInOutRegistrant}
							>Check-in <i className="material-icons">done</i>
						</button>
						:
						<button className="registrant-checkin-btn btn-full btn-large btn-none b-t-light btn-col-grey m-t-15 v-a-sub"
							onClick={this.checkInOutRegistrant}
							>Check-out <i className="material-icons v-a-sub">close</i>
						</button>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		registrantError : state.registrant.currentError,
		registrant : state.registrant.currentRegistrant
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadRegistrantByGuid : (guid) => dispatch(loadRegistrantByAttendeeGuid(guid)),
		clearCurrentRegistrant : () => dispatch(clearCurrentRegistrant()),
		upsertCurrentRegistrant : (registrant) => dispatch(upsertRegistrant(registrant))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminRegistrant);