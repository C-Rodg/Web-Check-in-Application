import React, { Component } from 'react';

export default class InputSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectVal : []
		};
		this.handlePickOne = this.handlePickOne.bind(this);
		this.handlePickMany = this.handlePickMany.bind(this);
	}

	// Alert form of pickone change
	handlePickOne(event) {
		if(this.props.exportAsText){
			this.props.onUpdateFormData(event.target.value, this.props.tagName);			
		} else {
			this.props.onUpdateFormData([event.target.value], this.props.tagName);			
		}
		this.setState({
			selectVal : [event.target.value]
		});
	}

	// Alert form of pickmany change
	handlePickMany(event) {		
		let options =  event.target.options;
		let value = [];
		Array.prototype.forEach.call(options, function(opt){
			if(opt.selected){
		 		value.push(opt.value);
		 	}
		});
		this.props.onUpdateFormData(value, this.props.tagName);
		this.setState({
			selectVal : value
		});
	}

	render() {
		const options = this.props.options && this.props.options.map((response) => {
			return (
				<option value={response.rTag} disabled={response.disabled}>{response.rLabel}</option>
			);
		});
		const { isRequired, tagName, questionPrompt, isDisabled, isPickMany } = this.props;
		return (
			<div className="col-xs-12 col-sm-6">
				<div className={"form-group " + (isRequired ? "req" : "")}>
					<label for={tagName}>{questionPrompt}</label>
					{ !isPickMany ? 

						<select className="form-control"
							id={tagName}
							disabled={isDisabled}							
							onChange={this.handlePickOne}
						>
							<option value="">- Select -</option>
							{options}
						</select>

						:

						<select className="form-control"
							id={tagName}
							disabled={isDisabled}
							multiple="true"
							onChange={this.handlePickMany}
						>
							{options}
						</select>

					}					
				</div>
			</div>
		);
	}
}