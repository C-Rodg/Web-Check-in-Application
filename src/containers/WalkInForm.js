import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Registrant, createWalkIn, sendNotification, generateSurveyDataXML, walkInWithSms } from '../actions/cc_registrant';
import { replaceMessagePlaceholders, extractXMLstring } from '../actions/cc_settings';
import InputText from '../components/InputText';
import InputSelect from '../components/InputSelect';

class WalkInForm extends Component {
	constructor(props, context) {
		super(props);
		this.state = {			
			formData : {}
		};
		this._registrant = {};
		this._requiredFields = [];
		this.generateForm = this.generateForm.bind(this);
		this.updateFormData = this.updateFormData.bind(this);
		this.checkInRegistrant = this.checkInRegistrant.bind(this);
		this.checkRequired = this.checkRequired.bind(this);
		this.assignRegistrantProps = this.assignRegistrantProps.bind(this);
		this.checkInWithSms = this.checkInWithSms.bind(this);
	}

	// Generate new registrant
	componentWillMount(){		
		this._registrant = new Registrant();
	}

	// Return to attendee/admin modes after successful upload
	componentDidUpdate(prevProps, prevState) {
		if(prevProps.returnToList !== this.props.returnToList) {
			if(this.context.router.isActive('/attendee/walkin')){
				this.context.router.push('/attendee/welcome');
			} else {
				this.context.router.push('/admin/results');
			}			
		}
	}

	// Generate walk-in form object based off of eventConfig
	generateForm(){
		if(!this.props.formConfig || this.props.formConfig.length === 0 ) {
			return (
				<div className="error-text">Uh-oh! A configuration file seems to be missing...</div>
			);
		}

		let questions = [];
		this._requiredFields = [];
		this.props.formConfig.forEach((question) => {
			if(question.req) {
				this._requiredFields.push(question.tag);
			}
			if(question.type === "T"){
				questions.push(<InputText questionPrompt={question.label} 
					tagName={question.tag} isRequired={question.req} 
					isDisabled={question.disabled} onUpdateFormData={this.updateFormData} />);
			} else if (question.type === "O") {
				questions.push(<InputSelect questionPrompt={question.label} 
					tagName={question.tag} isRequired={question.req} 
					options={question.responses} isPickMany={false} onUpdateFormData={this.updateFormData} exportAsText={false} />);
			} else if (question.type === 'M') {
				questions.push(<InputSelect questionPrompt={question.label} 
					tagName={question.tag} isRequired={question.req} options={question.responses} 
					isPickMany={true} onUpdateFormData={this.updateFormData} exportAsText={false} />);
			} else if (question.type === 'TO') {
				questions.push(<InputSelect questionPrompt={question.label}
					tagName={question.tag} isRequired={question.req} options={question.responses}
					isPickMany={false} exportAsText={true} onUpdateFormData={this.updateFormData} />);
			}
		});		
		return questions;
	}

	// Check for validity of required fields
	checkRequired() {
		let invalidField = "";
		const { formConfig } = this.props;
		if(this._requiredFields) {
			for(let i = 0, j = this._requiredFields.length ; i < j; i++){
				if(!this.state.formData[this._requiredFields[i]] || 
					(Array.isArray(this.state.formData[this._requiredFields[i]]) && 
					(this.state.formData[this._requiredFields[i]].length === 0 || 
						(this.state.formData[this._requiredFields[i]].length === 1 && !this.state.formData[this._requiredFields[i]][0]) ) ) ){
					for(let a = 0, b = formConfig.length; a < b; a++) {
						if(this._requiredFields[i] === formConfig[a].tag){
							invalidField = formConfig[a].label;
							break;
						}
					}
					break;
				}
			}					
		}
		return invalidField;
	}

	// Assign hinted values to registrant object
	assignRegistrantProps() {
		this.props.formConfig.forEach((fieldObj) => {			
			if(fieldObj.hasOwnProperty('hint') && fieldObj.hasOwnProperty('type') && fieldObj.hasOwnProperty('tag') && fieldObj.hint){
				let hint = fieldObj.hint.toUpperCase();
				let type = fieldObj.type.toUpperCase();
				let val = this.state.formData[fieldObj.tag];
				if(type === 'T' || type === 'TO'){
					if (hint === 'ATTENDEETYPE') {
						this._registrant.AttendeeType = val || null;
					} else if (hint === 'COMPANY') {
						this._registrant.Company = val || null;
					} else if (hint === 'EMAIL') {
						this._registrant.Email = val || null;
					} else if (hint === 'FIRSTNAME') {
						this._registrant.FirstName = val || null;
					} else if (hint === 'LASTNAME') {
						this._registrant.LastName = val || null;
					}
				} else if (type === 'O' && val) {
					let oVal = null;
					for(let i = 0, j = fieldObj.responses.length; i < j; i++) {
						if(val[0] === fieldObj.responses[i].rTag){
							oVal = fieldObj.responses[i].rLabel;
							break;
						}
					}
					if (hint === "ATTENDEETYPE") {
						this._registrant.AttendeeType = oVal || null;
					} else if (hint === 'COMPANY') {
						this._registrant.Company = oVal || null;
					} else if (hint === 'EMAIL') {
						this._registrant.Email = oVal || null;
					} else if (hint === 'FIRSTNAME') {
						this._registrant.FirstName = oVal || null;
					} else if (hint === 'LASTNAME') {
						this._registrant.LastName = oVal || null;
					}
				}				
			}
		});
	}

	// Check-in walk-in, determine if SMS is needed
	checkInRegistrant() {
		const { sendNotification, smsEnabled, smsMessage, smsField, upsertRegistrant } = this.props;
		// Check required fields
		let invalidText = this.checkRequired();
		if(invalidText) {
			sendNotification(`${invalidText} is a required field.`, false);
			return false;
		}		

		// Generate survey data property
		this._registrant.SurveyData = generateSurveyDataXML(this.state.formData);
		
		// Assign properties to the registrant object
		this.assignRegistrantProps();

		// Upload and/or send SMS
		if (smsEnabled && smsMessage && smsField) {
			this.checkInWithSms();
		} else {
			upsertRegistrant(this._registrant);
		}		
	}

	// Check-in with SMS
	checkInWithSms() {
		const { smsField, smsMessage, upsertRegistrant, walkInWithSms } = this.props;
		const number = extractXMLstring(smsField, this._registrant.SurveyData);
		const message = replaceMessagePlaceholders(smsMessage, this._registrant.SurveyData);
		if (number && message) {
			walkInWithSms(this._registrant, number, message);
		} else {
			upsertRegistrant(this._registrant);
		}
	}

	// Update form object
	updateFormData(value, tag) {
		let newDefinitionObj = Object.assign({}, this.state.formData);
		newDefinitionObj[tag] = value;
		this.setState({
			formData : newDefinitionObj
		});
	}

	render(){		
		return (
			<div className="walk-in-form clearfix">
				<div className="col-xs-12">
					{ this.generateForm() }						
				</div>
			
			{ (this.props.formConfig && this.props.formConfig.length > 0) ? 
				<div className="registrant-checkin">
					<button className="registrant-checkin-btn btn-full btn-large btn-none b-t-light btn-col-green m-t-15"
						onClick={this.checkInRegistrant}
						>Check-in
					</button>
				</div> :	""		
			}
			</div>
		);
	}
}

WalkInForm.contextTypes = {
	router : PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	const { registrant, settings: { configuration } } = state;
	return {
		formConfig : configuration.WalkInFields,
		returnToList : registrant.returnToList,
		smsEnabled : configuration.SMS.Enabled,
		smsMessage : configuration.SMS.Message,
		smsField : configuration.SMS.PhoneField
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		walkInWithSms : (registrant, num, msg) => dispatch(walkInWithSms(registrant, num, msg)),
		upsertRegistrant : (registrant) => dispatch(createWalkIn(registrant)),
		sendNotification : (msg, isSuccess) => dispatch(sendNotification(msg, isSuccess))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WalkInForm);