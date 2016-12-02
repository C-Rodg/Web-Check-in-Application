import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { loadRegistrantByAttendeeGuid, clearCurrentRegistrant, checkInRegistrant, checkOutRegistrant } from '../actions/cc_registrant';
import Loading from '../components/Loading';

class AdminRegistrant extends Component {
	constructor(props, context) {
		super(props);

		this.state = {
			showConfirm : false
		};

		this.checkOutRegistrant = this.checkOutRegistrant.bind(this);
		this.checkInRegistrant = this.checkInRegistrant.bind(this);
		this.getButtonActions = this.getButtonActions.bind(this);
		this.showConfirmMenu = this.showConfirmMenu.bind(this);
	}

	componentDidMount(){		
		this.props.loadRegistrantByGuid(this.props.params.atGuid);
	}

	componentWillUnmount(){
		this.props.clearCurrentRegistrant();
	}

	componentDidUpdate(){
		if(this.props.returnToList){
			this.context.router.push('/admin/results');
		}
	}

	checkInRegistrant(){
		this.props.checkInRegistrant(this.props.registrant);
	}

	checkOutRegistrant(){
		this.props.checkOutRegistrant(this.props.registrant);
	}

	getButtonActions(){
		if(this.props.registrant.Attended){
			return (
				<button className="registrant-checkin-btn btn-full btn-large btn-none b-t-light btn-col-grey m-t-15 v-a-sub"
					onClick={this.checkOutRegistrant}
					>Check-out
				</button>
			);
		}
		if(this.props.cancelledCheck){
			const surveyData = this.props.registrant.SurveyData;
			let isCancelled = false;
			this.props.cancelledCheck.forEach((check) => {
				if(surveyData.indexOf(check) > -1){
					isCancelled = true;
				}
			});
			if(isCancelled){
				return (
					<button className="registrant-checkin-btn btn-full btn-large btn-none b-t-light btn-col-grey m-t-15 v-a-sub p-l-0"
						onClick={this.showConfirmMenu}
					>
						Cancelled
					</button>
				);
			}
		}
		return (
			<button className="registrant-checkin-btn btn-full btn-large btn-none b-t-light btn-col-green m-t-15"
				onClick={this.checkInRegistrant}
				>Check-in
			</button>
		);		
	}

	showConfirmMenu() {
		this.setState({
			showConfirm : true
		});
	}

	render(){
		if(!this.props.registrantError && !this.props.registrant) {
			return (<Loading height={112} width={112} />);
		}
		if(this.props.registrantError){
			return (<div className="error-text">Uh-oh! There was an issue loading that record...</div>);
		}
		return (
			<div className="admin-registrant text-center">
				<div className="admin-info col-xs-12">
					<div className="registrant-name f-s-44">{this.props.registrant.FirstName + " " + this.props.registrant.LastName}</div>
					<div className="registrant-company f-s-24 other-info">{this.props.registrant.Company}</div>
					<div className="registrant-email f-s-24 other-info">{this.props.registrant.Email}</div>
					<div className="registrant-atType f-s-24 other-info">{this.props.registrant.AttendeeType}</div>
				</div>
				<div className="registrant-checkin">
					{ this.getButtonActions() }					
				</div>
				<div className={"confirm-checkin " + (!this.state.showConfirm ? '' : 'confirm-checkin-yes')}>
					<p>Continue checking in?</p>
					<button className="btn btn-flat uppercase btn-col-green" onClick={this.checkInRegistrant}>Check-In</button>
				</div>
			</div>
		);
	}
}

AdminRegistrant.contextTypes = {
	router : PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		registrantError : state.registrant.currentError,
		registrant : state.registrant.currentRegistrant,
		returnToList : state.registrant.returnToList,
		cancelledCheck : state.settings.configuration.CancelledStrings
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadRegistrantByGuid : (guid) => dispatch(loadRegistrantByAttendeeGuid(guid)),
		clearCurrentRegistrant : () => dispatch(clearCurrentRegistrant()),
		checkInRegistrant : (registrant) => dispatch(checkInRegistrant(registrant)),
		checkOutRegistrant : (registrant) => dispatch(checkOutRegistrant(registrant))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminRegistrant);