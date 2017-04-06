import React, { Component } from 'react';

export default class InputText extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {		
		this.props.onUpdateFormData(event.target.value, this.props.tagName);
	}

	render() {
		const { isRequired, questionPrompt, tagName, isDisabled} = this.props;
		return (
			<div className="col-xs-12 col-sm-6">
				<div className={"form-group" + (isRequired ? " req" : "")}>
					<label for={tagName}>{questionPrompt}</label>
					<input className="form-control"
						id={tagName}
						type="text"
						disabled={isDisabled}
						placeholder={"Enter " + questionPrompt}
						onChange={this.handleChange}
					/>
				</div>
			</div>
		);
	}
}