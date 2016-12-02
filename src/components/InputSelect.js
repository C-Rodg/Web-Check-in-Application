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

	handlePickOne(event) {
		console.log(event.target.value);
		this.props.onUpdateFormData([event.target.value], this.props.tagName);
		this.setState({
			selectVal : [event.target.value]
		});		
	}

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
		console.log(value);
	}

	render() {
		const options = this.props.options.map((response) => {
			return (
				<option value={response.id} disabled={response.disabled}>{response.prompt}</option>
			);
		})
		return (
			<div className="col-xs-12 col-sm-6">
				<div className={"form-group " + (this.props.isRequired ? "req" : "")}>
					<label for={this.props.tagName}>{this.props.questionPrompt}</label>
					{ !this.props.isPickMany ? 

						<select className="form-control"
							id={this.props.tagName}
							disabled={this.props.isDisabled}							
							onChange={this.handlePickOne}
						>
							<option value="">- Select -</option>
							{options}
						</select>

						:

						<select className="form-control"
							id={this.props.tagName}
							disabled={this.props.isDisabled}
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