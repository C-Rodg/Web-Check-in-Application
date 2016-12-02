import React, { Component } from 'react';

export default class NotificationBar extends Component {
	constructor(props){
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState){
		if(this.props.counter !== nextProps.counter){
			return true;
		}
	}

	componentDidUpdate(){
		this.refs.errorBox.classList.add('in');
		this._timeout = setTimeout(() => {
			this.refs.errorBox.classList.remove('in');
		}, this.props.time);
	}

	componentWillUnmount(){
		console.log('removing notification bar');
		this._timeout = null;
	}

	render() {
		return (
			<div className="row error-notification" 
				ref="errorBox" 
				style={{backgroundColor : this.props.bgColor, color: this.props.textColor}}
			>
				<div className="col-xs-12 text-center error-notify-text">{this.props.text}</div>
			</div>
		);
	}
}

NotificationBar.defaultProps = {
	text : 'Something seems to be wrong...',
	time : 5000,
	bgColor : "#e74c3c",
	textColor : "#ffffff",
	counter : 0
};