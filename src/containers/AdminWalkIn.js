import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Registrant } from '../actions/cc_registrant';
import InputText from '../components/InputText';
import InputSelect from '../components/InputSelect';

// TESTING 
import config from './TESTING_CONFIG';
console.log(config);

class AdminWalkIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			registrant : {},
			formData : {}
		};
		this.generateForm = this.generateForm.bind(this);
		this.updateFormData = this.updateFormData.bind(this);
	}

	componentWillMount(){		
		this.setState({
			registrant : (new Registrant())
		});
	}

	generateForm(){
		// ALERT IF NO FORMCONFIG FOUND

		// CHANGE TO PROPS
		let questions = [];
		config.forEach((question) => {
			if(question.type === "T"){
				questions.push(<InputText questionPrompt={question.label} tagName={question.tag} isRequired={question.req} isDisabled={question.disabled} onUpdateFormData={this.updateFormData} />);
			} else if (question.type === "O") {
				//questions.push(<InputSelect />)
			} else if (question.type === 'M') {

			}
		})
	}

	updateFormData(value, tag) {
		console.log(tag);
		let newDefinitionObj = Object.assign({}, this.state.formData);
		newDefinitionObj[tag] = value;
		this.setState({
			formData : newDefinitionObj
		});
	}

	render(){
		const opt = [{
			id : "qrColor_1",
			disabled : false,
			prompt : "Blue"
		}, {
			id : "qrColor_2",
			disabled : false,
			prompt : "Green"
		}, {
			id : "qrColor_3",
			disabled : false,
			prompt : "Red"
		}, {
			id : "qrColor_4",
			disabled : true,
			prompt : "Yellow"
		}, {
			id : "qrColor_5",
			disabled : false,
			prompt : "Pink"
		}];
		return (
			<div className="col-xs-12 walk-in-form">
				<InputText questionPrompt="First Name" tagName="qrFirstName" isRequired={true} onUpdateFormData={this.updateFormData}/>
				<InputText questionPrompt="Last Name" tagName="qrLastName" isRequired={true} onUpdateFormData={this.updateFormData}/>
				<InputText questionPrompt="Company" tagName="qrCompany" onUpdateFormData={this.updateFormData}/>
				<InputText questionPrompt="Title" tagName="qrTitle" isDisabled={true} onUpdateFormData={this.updateFormData}/>
				<InputText questionPrompt="Email" tagName="qrEmail" onUpdateFormData={this.updateFormData}/>
				<InputSelect questionPrompt="What is your favorite band?" tagName="qrBand" isRequired={true} options={opt} isPickMany={true} onUpdateFormData={this.updateFormData}/>
				<InputText questionPrompt="Country" tagName="qrCountry" onUpdateFormData={this.updateFormData}/>
				<InputSelect questionPrompt="What is your favorite Color?" tagName="qrColor" isRequired={true} options={opt} isPickMany={false} onUpdateFormData={this.updateFormData}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		formConfig : state.settings.WalkInFields
	};
}

export default connect(mapStateToProps)(AdminWalkIn);