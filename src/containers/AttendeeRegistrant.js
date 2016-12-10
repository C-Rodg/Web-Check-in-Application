import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { loadRegistrantByAttendeeGuid, checkInRegistrant, checkOutRegistrant } from '../actions/cc_registrant';
import Loading from '../components/Loading';
import BackButton from '../components/BackButton';

class AttendeeRegistrant extends Component {
	constructor(props, context) {
		super(props);

		this.getTitleText = this.getTitleText.bind(this);
		this.checkCancelled = this.checkCancelled.bind(this);
		this.getActionButtons = this.getActionButtons.bind(this);
		this.checkInRegistrant = this.checkInRegistrant.bind(this);
		this.checkOutRegistrant = this.checkOutRegistrant.bind(this);
	}

	componentDidMount() {
		this.props.loadRegistrantByGuid(this.props.params.atGuid);
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.returnToList !== prevProps.returnToList) {
			this.context.router.push('/attendee/welcome');
		}
	}	

	checkInRegistrant() {
		this.props.checkInRegistrant(this.props.registrant);
	}

	checkOutRegistrant() {
		this.props.checkOutRegistrant(this.props.registrant);
	}

	checkCancelled() {
		let isCancelled = false;
		if (this.props.cancelledCheck && this.props.registrant) {
			const surveyData = this.props.registrant.SurveyData;			
			this.props.cancelledCheck.forEach((check) => {
				if(surveyData.indexOf(check) > -1) {
					isCancelled = true;
				}
			});
		}
		return isCancelled;
	}

	getTitleText(cancelled) {
		if(!this.props.registrantError && !this.props.registrant){
			return (<Loading height={112} width={112} color="#f5f5f5" />);
		}
		if(this.props.registrantError) {
			return("Uh-oh! There was an issue loading that record...");
		}
		if(cancelled) {
			return ("There is an issue with this registration.  Please see the help desk to continue checking in.");
		}
		return ("Please confirm your information to continue checking in.");
	}

	getActionButtons(cancelled) {
		if(cancelled) {
			return ("");
		}
		if(this.props.registrant.Attended) {
			return (
				<div className="registrant-checkin">
					<button className="registrant-checkin-btn btn-full btn-large btn-none b-t-light btn-col-grey m-t-15 v-a-sub"
						onClick={this.checkOutRegistrant}>
						Check-out
					</button>
				</div>
			);
		}
		return (
			<div className="registrant-checkin">
				<button className="registrant-checkin-btn btn-full btn-large btn-none b-t-light btn-col-green m-t-15"
					onClick={this.checkInRegistrant}>
					Check-in
				</button>
			</div>
		);
	}

	render() {
		let isCancelled = this.checkCancelled();
		return (
			<div className="attendee-registrant container-fluid">
				<BackButton />
				<div className="row">
					<div className="instruction-text col-xs-12">
						{ this.getTitleText(isCancelled) }
					</div>
				</div>
				{ (!this.props.registrantError && this.props.registrant) ?
					<div className="row">
						<div className="attendee-info card-container m-t-15 clearfix text-center">
							<div className="attendee-fields col-xs-12">
								<div className="registrant-name f-s-44">{this.props.registrant.FirstName + " " + this.props.registrant.LastName}</div>
								<div className="registrant-company f-s-24 other-info">{this.props.registrant.Company}</div>
								<div className="registrant-email f-s-24 other-info">{this.props.registrant.Email}</div>
								<div className="registrant-atType f-s-24 other-info">{this.props.registrant.AttendeeType}</div>
							</div>
							{ this.getActionButtons(isCancelled) }
						</div>
					</div>
					:
					""
				}				
			</div>
		);
	}
}

AttendeeRegistrant.contextTypes = {
	router : PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		registrantError : state.registrant.currentError,
		registrant : state.registrant.currentRegistrant,
		returnToList : state.registrant.returnToList,
		cancelledCheck : state.settings.configuration.CancelledStrings
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadRegistrantByGuid : (guid) => dispatch(loadRegistrantByAttendeeGuid(guid)),
		checkInRegistrant : (registrant) => dispatch(checkInRegistrant(registrant)),
		checkOutRegistrant : (registrant) => dispatch(checkOutRegistrant(registrant))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeRegistrant);