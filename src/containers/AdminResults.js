import React, { Component } from 'react';
import { connect } from 'react-redux';

import AttendeeTile from '../components/AttendeeTile';
import TableSort from '../components/TableSort';
import Loading from '../components/Loading';
import CheckinTile from '../components/CheckinTile';

import { quickCheckAttendeeOut, quickCheckAttendeeIn } from '../actions/cc_registrant';

// NOTE - reverse true = A-Z, reverse false = Z-A
function advancedSort(field, reverse, primer){
	let key = function(x) {
		return primer ? primer(x[field]) : x[field];
	};

	return function(a, b) {
		let A = key(a),
			B = key(b);
		return ( (A<B) ? -1 : ((A>B) ? 1 : 0) ) * [-1,1][+!!reverse];
	}
}

class AdminResults extends Component {
	constructor(props) {
		super(props);

		this.state = { sort : "First Name", sortDirection : "down" };

		this.getRegistrantList = this.getRegistrantList.bind(this);
		this.getTableTitleText = this.getTableTitleText.bind(this);
		this.handleChangeSort = this.handleChangeSort.bind(this);
		this.handleChangeSortDirection = this.handleChangeSortDirection.bind(this);
		this.handleRegistrantClick = this.handleRegistrantClick.bind(this);
	}

	// Reset to sort by first name if new reg list comes through
	componentWillReceiveProps(nextProps) {
		if(this.props.registrantList !== nextProps.registrantList){			
			this.setState({
				sort : "First Name",
				sortDirection : "down"
			});
		}
	}

	// Build the registrant list table
	getRegistrantList(){
		if (this.props.searchLoading) {
			return "";
		}
		let dir = (this.state.sortDirection === 'down' ? true : false);
		let field;
		if(this.state.sort === 'First Name'){
			field = "FirstName";
		} else if (this.state.sort === 'Last Name') {
			field = "LastName"
		} else if (this.state.sort === 'Type') {
			field = "AttendeeType";
		} else if (this.state.sort === 'Checked In'){
			field = "Attended";
		} else {
			field = this.state.sort;
		}
		let sortedArray = this.props.registrantList.concat().sort(advancedSort(field, dir, (a) => { return String(a).toUpperCase(); }));
		if (!this.props.quickCheckIn) {
			return sortedArray.map((registrant) => {
				return (
					<AttendeeTile key={registrant.AttendeeGuid} 
						checkedIn={registrant.Attended}
						firstName={registrant.FirstName}
						lastName={registrant.LastName}
						company={registrant.Company}
						email={registrant.Email}
						attendeeType={registrant.AttendeeType}					
						guid={registrant.AttendeeGuid}
					/>
				);
			});
		} else {
			return sortedArray.map((registrant) => {
				return (
					<CheckinTile key={registrant.AttendeeGuid}
						checkedIn={registrant.Attended}
						firstName={registrant.FirstName}
						lastName={registrant.LastName}
						company={registrant.Company}
						email={registrant.Email}
						attendeeType={registrant.AttendeeType}					
						guid={registrant.AttendeeGuid}
						onRegClick={this.handleRegistrantClick}
					/>
				);
			});
		}	
	}

	// Quick Check-in mode is on, check-in/out registrant
	handleRegistrantClick(ev, reg) {
		ev.preventDefault();
		ev.stopPropagation();
		// Check out registrant
		if(reg.checkedIn) {
			this.props.quickCheckAttendeeOut(reg.guid);			
		}
		// Check in registrant 
		else {
			const configObj = {
				guid: reg.guid,
				smsEnabled: this.props.smsEnabled,
				smsMessage: this.props.smsMessage,
				smsField: this.props.smsField,
				cancel: this.props.cancelledCheck
			};
			this.props.quickCheckAttendeeIn(configObj);
		}
	}

	// Change the sort direction
	handleChangeSortDirection(direction) {
		const newDirection = (direction === 'down' ? 'up' : 'down');
		this.setState({
			sortDirection : newDirection
		});
	}

	// Change the sort value, reset to down
	handleChangeSort(event) {		
		this.setState({
			sort : event.target.id,
			sortDirection : "down"
		});
	}

	// Build the table title
	getTableTitleText(){
		const { searchLoading, searchError, hasSearched, registrantList } = this.props;
		if(searchLoading) {
			return (<tr><th><Loading height={112} width={112} /></th></tr>);
		}
		if(searchError) {
			return (<tr><th>Uh-oh! There was an issue searching...</th></tr>);
		}
		if(!hasSearched) {
			return (<tr><th>Ready to begin searching...</th></tr>);
		}
		if(hasSearched && registrantList.length === 0){
			return (<tr><th>No registrants found...</th></tr>);
		}
		return (
			<TableSort sort={this.state.sort} 
				sortDirection={this.state.sortDirection} 
				changeSort={this.handleChangeSort} 
				changeSortDirection={this.handleChangeSortDirection} 
			/>
		);
	}

	render(){
		return (
			<div className="col-xs-12">
				<div className="results-table table-responsive">
					<table className="table">
						<thead>
							{this.getTableTitleText()}
						</thead>
						{ (this.props.registrantList && this.props.registrantList.length > 0) 
						? 
							<tbody>
								{this.getRegistrantList()}
							</tbody>
						: 
						""
						}						
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { registrant: { registrantList, hasSearched, searchError, searchLoading }, settings: { configuration }} = state;
	return {
		registrantList,
		hasSearched,
		searchError,
		searchLoading,
		quickCheckIn: configuration.QuickCheckin,
		cancelledCheck: configuration.CancelledStrings,
		smsEnabled : configuration.SMS.Enabled,
		smsMessage : configuration.SMS.Message,
		smsField : configuration.SMS.PhoneField
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		quickCheckAttendeeOut: (guid) => dispatch(quickAttendeeCheckOut(guid)),
		quickCheckAttendeeIn: (configObj) => dispatch(quickAttendeeCheckIn(configObj))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminResults);