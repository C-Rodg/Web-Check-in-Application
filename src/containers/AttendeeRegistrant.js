import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { 
	loadRegistrantByAttendeeGuid, 
	checkInRegistrant, 
	checkOutRegistrant,	
	checkInWithSms
} from '../actions/cc_registrant';
import { replaceMessagePlaceholders, extractXMLstring } from '../actions/cc_settings';
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
		this.checkInAndSendSms = this.checkInAndSendSms.bind(this);
	}

	// Load Registrant by attendee guid
	componentDidMount() {
		this.props.loadRegistrantByGuid(this.props.params.atGuid);
	}

	// Navigate back to attendee welcome page
	componentDidUpdate(prevProps, prevState) {
		if(this.props.returnToList !== prevProps.returnToList) {
			this.context.router.push('/attendee/welcome');
		}
	}	

	// Check in registrant, see if SMS is needed
	checkInRegistrant() {
		const { registrant, smsEnabled, smsField, smsMessage, checkInRegistrant } = this.props;
		if (smsEnabled && smsField && smsMessage) {
			this.checkInAndSendSms();
		} else {
			checkInRegistrant(registrant);
		}		
	}

	// Check in with SMS
	checkInAndSendSms() {
		const { smsField, registrant, smsMessage } = this.props;
		const number = extractXMLstring(smsField, registrant.SurveyData);
		const msg = replaceMessagePlaceholders(smsMessage, registrant.SurveyData);
		if(number && msg) {
			this.props.checkInWithSms(registrant, number, msg);
		} else {
			this.props.checkInRegistrant(registrant);
		}
	}

	// Check-out registrant
	checkOutRegistrant() {
		this.props.checkOutRegistrant(this.props.registrant);
	}

	// Check if registrant is marked as cancelled
	checkCancelled() {
		let isCancelled = false;
		const { cancelledCheck, registrant } = this.props;
		if (cancelledCheck && registrant) {
			const surveyData = registrant.SurveyData;			
			cancelledCheck.forEach((check) => {
				if(surveyData.indexOf(check) > -1) {
					isCancelled = true;
				}
			});
		}
		return isCancelled;
	}

	// Get title text
	getTitleText(cancelled) {
		const { registrantError, registrant } = this.props;
		if(!registrantError && !registrant){
			return (<Loading height={112} width={112} color="#f5f5f5" />);
		}
		if(registrantError) {
			return("Uh-oh! There was an issue loading that record...");
		}
		if(cancelled) {
			return ("There is an issue with this registration. Please see the help desk for assistance.");
		}
		return ("Please confirm your information to continue checking in.");
	}

	// Get check-in, check-out, cancelled buttons
	getActionButtons(cancelled) {
		if(cancelled) {
			return ("");
		}
		if(this.props.registrant.Attended) {
			return (
				<div className="registrant-checkin">
					<button className="registrant-checkin-btn btn-full btn-large btn-none b-t-light btn-col-grey v-a-sub"
						onClick={this.checkOutRegistrant}>
						Check-out
					</button>
				</div>
			);
		}
		return (
			<div className="registrant-checkin">
				<button className="registrant-checkin-btn btn-full btn-large btn-none b-t-light btn-col-green"
					onClick={this.checkInRegistrant}>
					Check-in
				</button>
			</div>
		);
	}

	render() {
		let isCancelled = this.checkCancelled();
		const { registrant } = this.props;
		return (
			<div className="attendee-registrant container-fluid">
				<BackButton />
				<div className="row">
					<div className="instruction-text col-xs-12">
						{ this.getTitleText(isCancelled) }
					</div>
				</div>
				{ (!this.props.registrantError && registrant) ?
					<div className="row">
						<div className="attendee-info card-container m-t-15 clearfix text-center">
							<div className="attendee-fields col-xs-12 m-b-15">
								<div className="registrant-name f-s-44">{registrant.FirstName + " " + registrant.LastName}</div>
								<div className="registrant-company f-s-24 other-info">{registrant.Company}</div>
								<div className="registrant-email f-s-24 other-info">{registrant.Email}</div>
								<div className="registrant-atType f-s-24 other-info">{registrant.AttendeeType}</div>
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
	const { registrant, settings: { configuration } } = state;
	return {
		registrantError : registrant.currentError,
		registrant : registrant.currentRegistrant,
		returnToList : registrant.returnToList,
		cancelledCheck : configuration.CancelledStrings,
		smsEnabled : configuration.SMS.Enabled,
		smsMessage : configuration.SMS.Message,
		smsField : configuration.SMS.PhoneField
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadRegistrantByGuid : (guid) => dispatch(loadRegistrantByAttendeeGuid(guid)),
		checkInRegistrant : (registrant) => dispatch(checkInRegistrant(registrant)),
		checkOutRegistrant : (registrant) => dispatch(checkOutRegistrant(registrant)),
		checkInWithSms : (registrant, number, msg) => dispatch(checkInWithSms(registrant, number, msg))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeRegistrant);