import React, { Component } from 'react';

export default class NotificationBar extends Component {
	constructor(props){
		super(props);
	}

	// Determine if notification should be shown
	shouldComponentUpdate(nextProps, nextState){
		if(this.props.counter !== nextProps.counter){
			return true;
		}
	}

	// Show notification, then remove
	componentDidUpdate(){
		this.refs.errorBox.classList.add('in');
		this._timeout = setTimeout(() => {
			if(this.refs.errorBox){
				this.refs.errorBox.classList.remove('in');
			}			
		}, this.props.time);
	}

	// remove timeout
	componentWillUnmount(){		
		this._timeout = null;
	}

	render() {
		return (
			<div className={"row error-notification " + (this.props.typeSuccess ? 'notify-success' : 'notify-fail')}
				ref="errorBox">
				<div className="col-xs-12 text-center error-notify-text">{this.props.text}</div>
			</div>
		);
	}
}

NotificationBar.defaultProps = {
	text : 'Something seems to be wrong...',
	time : 3000,	
	counter : 0,
	typeSuccess : false
};