import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Registrant } from '../actions/cc_registrant';
import InputText from '../components/InputText';
import InputSelect from '../components/InputSelect';
import { createWalkIn, sendNotification, generateSurveyDataXML } from '../actions/cc_registrant';

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
	}

	componentWillMount(){		
		this._registrant = new Registrant();
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.returnToList !== this.props.returnToList) {
			if(this.context.router.isActive('/attendee/walkin')){
				this.context.router.push('/attendee/welcome');
			} else {
				this.context.router.push('/admin/results');
			}			
		}
	}

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
					options={question.responses} isPickMany={false} onUpdateFormData={this.updateFormData} />);
			} else if (question.type === 'M') {
				questions.push(<InputSelect questionPrompt={question.label} 
					tagName={question.tag} isRequired={question.req} options={question.responses} 
					isPickMany={true} onUpdateFormData={this.updateFormData}/>);
			}
		});		
		return questions;
	}

	checkRequired() {
		let invalidField = "";
		if(this._requiredFields) {
			for(let i = 0, j = this._requiredFields.length ; i < j; i++){
				if(!this.state.formData[this._requiredFields[i]] || 
					(Array.isArray(this.state.formData[this._requiredFields[i]]) && 
					(this.state.formData[this._requiredFields[i]].length === 0 || 
						(this.state.formData[this._requiredFields[i]].length === 1 && !this.state.formData[this._requiredFields[i]][0]) ) ) ){
					for(let a = 0, b = this.props.formConfig.length; a < b; a++) {
						if(this._requiredFields[i] === this.props.formConfig[a].tag){
							invalidField = this.props.formConfig[a].label;
							break;
						}
					}
					break;
				}
			}					
		}
		return invalidField;
	}

	assignRegistrantProps() {
		this.props.formConfig.forEach((fieldObj) => {			
			if(fieldObj.hasOwnProperty('hint') && fieldObj.hasOwnProperty('type') && fieldObj.hasOwnProperty('tag') && fieldObj.hint){
				let hint = fieldObj.hint.toUpperCase();
				let type = fieldObj.type.toUpperCase();
				let val = this.state.formData[fieldObj.tag];
				if(type === 'T'){
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

	checkInRegistrant() {

		// Check required fields
		let invalidText = this.checkRequired();
		if(invalidText) {
			this.props.sendNotification(`${invalidText} is a required field.`, false);
			return false;
		}		

		// Generate survey data property
		this._registrant.SurveyData = generateSurveyDataXML(this.state.formData);
		
		// Assign properties to the registrant object
		this.assignRegistrantProps();

		// Upload
		this.props.upsertRegistrant(this._registrant);
	}

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
			
			{ this.props.formConfig.length > 0 ? 
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
	return {
		formConfig : state.settings.configuration.WalkInFields,
		returnToList : state.registrant.returnToList
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		upsertRegistrant : (registrant) => dispatch(createWalkIn(registrant)),
		sendNotification : (msg, isSuccess) => dispatch(sendNotification(msg, isSuccess))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WalkInForm);