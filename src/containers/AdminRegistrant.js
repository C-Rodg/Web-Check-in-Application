import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { 
		loadRegistrantByAttendeeGuid, 
		loadRegistrantByBadgeId, 
		clearCurrentRegistrant, 
		checkInRegistrant, 
		checkOutRegistrant, 
		parseXml, 
		getTextFromXml, 
		getPickFromXml,
		replaceMessagePlaceholders,
		extractXMLstring,
		checkInWithSms
	} from '../actions/cc_registrant';

import Loading from '../components/Loading';

class AdminRegistrant extends Component {
	constructor(props, context) {
		super(props);

		this.state = {
			showConfirm : false,
			showMoreFields : false
		};

		this._returnToScan = false;

		this.checkOutRegistrant = this.checkOutRegistrant.bind(this);
		this.checkInRegistrant = this.checkInRegistrant.bind(this);
		this.getButtonActions = this.getButtonActions.bind(this);
		this.toggleConfirmMenu = this.toggleConfirmMenu.bind(this);
		this.checkCancelled = this.checkCancelled.bind(this);
		this.toggleShowMoreFields = this.toggleShowMoreFields.bind(this);
		this.viewSurveyFields = this.viewSurveyFields.bind(this);
		this.checkInAndSendSms = this.checkInAndSendSms.bind(this);
	}

	componentDidMount() {	
		if (this.props.location && this.props.location.hasOwnProperty('query') && this.props.location.query.badge) {
			this.props.loadRegistrantByBadgeId(this.props.location.query.badge);
			this._returnToScan = true;
		} else if (this.props.params.atGuid) {
			this.props.loadRegistrantByGuid(this.props.params.atGuid);
		}	
	}

	componentWillUnmount() {
		this.props.clearCurrentRegistrant();
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.returnToList !== prevProps.returnToList){
			if (!this._returnToScan) {
				this.context.router.push('/admin/results');
			} else {
				this.context.router.push('/admin/scan');
			}			
		}
	}

	checkInRegistrant() {
		if (this.props.smsEnabled && this.props.smsMessage && this.props.smsField) {
			this.checkInAndSendSms();
		} else {
			this.props.checkInRegistrant(this.props.registrant);
		}	
	}

	// Extract phone number, complete message and send sms
	checkInAndSendSms() {
		const number = extractXMLstring(this.props.smsField, this.props.registrant.SurveyData);
		const msg = replaceMessagePlaceholders(this.props.smsMessage, this.props.registrant.SurveyData);
		if(number && msg) {
			this.props.checkInWithSms(this.props.registrant, number, msg);
		} else {
			this.props.checkInRegistrant(this.props.registrant);
		}
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

	getButtonActions(cancelled) {
		if(this.props.registrant.Attended){
			return (
				<button className="registrant-checkin-btn btn-full btn-large btn-none b-t-light btn-col-grey v-a-sub"
					onClick={this.checkOutRegistrant}
					>Check-out
				</button>
			);
		}
		if(cancelled) {
			return (
				<button className="registrant-checkin-btn btn-full btn-large btn-none b-t-light btn-col-grey v-a-sub p-l-0"
					onClick={this.toggleConfirmMenu}
				>
					Check-In
				</button>
			);
		}		
		return (
			<button className="registrant-checkin-btn btn-full btn-large btn-none b-t-light btn-col-green"
				onClick={this.checkInRegistrant}
				>Check-in
			</button>
		);		
	}

	toggleConfirmMenu() {
		this.setState({
			showConfirm : !this.state.showConfirm
		});
	}

	toggleShowMoreFields() {
		this.setState({
			showMoreFields : !this.state.showMoreFields
		});
	}

	viewSurveyFields() {
		if(this.props.registrant && this.props.registrant.SurveyData && this.props.formFields){
			let fullSurveyInfo = [];
			let xmlDoc = parseXml(this.props.registrant.SurveyData);
			let rootNode = xmlDoc.firstChild;
			let responsesNode = rootNode.firstChild;
			this.props.formFields.forEach((fieldObj) => {
				if(fieldObj.type === 'T' || fieldObj.type === 'TO') {
					let val = getTextFromXml(responsesNode, fieldObj.tag);
					fullSurveyInfo.push(<div className="col-xs-12 col-sm-6 more-field"><span className="more-field-title">{fieldObj.label}: </span>{val}</div>);
				} else if ((fieldObj.type === 'O' || fieldObj.type === 'M') && fieldObj.responses) {
					let vals = [];
					fieldObj.responses.forEach((response) => {
						if(getPickFromXml(responsesNode, response.rTag)){
							vals.push(response.rLabel);
						}
					});
					fullSurveyInfo.push(<div className="col-xs-12 col-sm-6 more-field"><span className="more-field-title">{fieldObj.label}: </span>{vals.join(', ')}</div>);
				}
			});
			return fullSurveyInfo;
		}
	}

	render() {
		if(!this.props.registrantError && !this.props.registrant) {
			return (<Loading height={112} width={112} />);
		}
		if(this.props.registrantError){
			return (<div className="error-text">Uh-oh! There was an issue loading that record...</div>);
		}
		let isCancelled = this.checkCancelled();
		return (
			<div className={"admin-registrant text-center " + ((isCancelled  && !this.props.registrant.Attended) ? 'admin-registrant-cancelled' : '')}>
				<div className="admin-info col-xs-12">
					<div className="registrant-name f-s-44">{this.props.registrant.FirstName + " " + this.props.registrant.LastName}</div>
					<div className="registrant-company f-s-24 other-info">{this.props.registrant.Company}</div>
					<div className="registrant-email f-s-24 other-info">{this.props.registrant.Email}</div>
					<div className="registrant-atType f-s-24 other-info">{this.props.registrant.AttendeeType}</div>
					{ isCancelled ? 
						<p className="cancelled-text">This registration is marked as cancelled.</p>
						: 
						""
					}
					<div className="registrant-more-box col-xs-12">
						<span className="registrant-more-toggle" onClick={this.toggleShowMoreFields}>
							<i className="material-icons">{"keyboard_arrow_" + (this.state.showMoreFields ? 'up' : 'down')}</i>
						</span>
						{
							(this.state.showMoreFields) ?
								<div className="more-survey-fields">
									{this.viewSurveyFields()}
								</div>
							:
							""
						}						
						
					</div>
					<div className={"col-xs-12 confirm-checkin " + (!this.state.showConfirm ? '' : 'confirm-checkin-yes')}>
						<p>Continue checking in?</p>
						<button className="btn btn-flat uppercase btn-col-green" onClick={this.checkInRegistrant}>Yes</button>
						<button className="btn btn-flat uppercase btn-col-black" onClick={this.toggleConfirmMenu}>No</button>
					</div>
				</div>
				<div className="registrant-checkin">
					{ this.getButtonActions(isCancelled) }					
				</div>				
			</div>
		);
	}
}

AdminRegistrant.contextTypes = {
	router : PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	const {registrant, settings: { configuration } } = state;
	return {
		registrantError : registrant.currentError,
		registrant : registrant.currentRegistrant,
		returnToList : registrant.returnToList,
		cancelledCheck : configuration.CancelledStrings,
		formFields : configuration.WalkInFields,
		smsEnabled : configuration.SMS.Enabled,
		smsMessage : configuration.SMS.Message,
		smsField : configuration.SMS.PhoneField
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadRegistrantByBadgeId : (badge) => dispatch(loadRegistrantByBadgeId(badge)),
		loadRegistrantByGuid : (guid) => dispatch(loadRegistrantByAttendeeGuid(guid)),
		clearCurrentRegistrant : () => dispatch(clearCurrentRegistrant()),
		checkInRegistrant : (registrant) => dispatch(checkInRegistrant(registrant)),
		checkOutRegistrant : (registrant) => dispatch(checkOutRegistrant(registrant))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminRegistrant);