import React, { Component } from 'react';

export default class InputText extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		console.log(event);
		console.log(this.props.tagName);
		this.props.onUpdateFormData(event.target.value, this.props.tagName);
	}

	render() {
		return (
			<div className="col-xs-12 col-sm-6">
				<div className={"form-group" + (this.props.isRequired ? " req" : "")}>
					<label for={this.props.tagName}>{this.props.questionPrompt}</label>
					<input className="form-control"
						id={this.props.tagName}
						type="text"
						disabled={this.props.isDisabled}
						placeholder={"Enter " + this.props.questionPrompt}
						onChange={this.handleChange}
					/>
				</div>
			</div>
		);
	}
}