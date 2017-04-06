import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { searchRegistrants, sendNotification } from '../actions/cc_registrant';
import BackButton from '../components/BackButton';
import Loading from '../components/Loading';

class AttendeeSearch extends Component {
	constructor(props, context) {
		super(props);

		this.state = {
			searchTerm : ""
		};

		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.getSearchTerm = this.getSearchTerm.bind(this);
		this.getRegistrantList = this.getRegistrantList.bind(this);
		this.registrantAlreadyLoaded = this.registrantAlreadyLoaded.bind(this);
		this.generateMessageText = this.generateMessageText.bind(this);
	}

	// Load registrant
	componentWillReceiveProps(nextProps) {
		if(nextProps.regList.length === 1 && nextProps.regList[0].Attended !== true) {
			this.context.router.push('/attendee/registrant/' + nextProps.regList[0].AttendeeGuid);
		}		
	}

	// Start searching for registrant
	handleSearchSubmit(event) {
		event.preventDefault();
		let filter = 'both';
		let { searchBy } = this.props;
		if(searchBy && searchBy.toUpperCase() === 'EMAIL') {
			filter = 'email';
		} else if (searchBy && searchBy.toUpperCase() === 'LASTNAME') {
			filter = 'lastname';
		}
		this.props.searchRegistrants(this.state.searchTerm, filter);
	}

	// Update state of search box
	handleInputChange(event) {
		this.setState({
			searchTerm : event.target.value
		});
	}

	// Get title search text
	getSearchTerm() {
		let searchTerm = 'email address or last name';
		let { searchBy } = this.props;
		if(searchBy){
			if(searchBy.toUpperCase() === 'EMAIL'){
				searchTerm = 'email address';
			} else if (searchBy.toUpperCase() === 'LASTNAME') {
				searchTerm = 'last name';
			}
		}
		return searchTerm;
	}

	// Throw error if registrant is already loaded
	registrantAlreadyLoaded(event) {
		event.preventDefault();
		this.props.sendNotification("It appears you have already checked-in. Please see the help desk for assistance.", false);
	}

	// Get list of registrants
	getRegistrantList(){
		return this.props.regList.map((registrant) => {
			if(registrant.Attended){
				return (
					<Link key={registrant.AttendeeGuid} 
						className="attendee-search-tile" 
						to={"/attendee/registrant/" + registrant.AttendeeGuid}
						onClick={this.registrantAlreadyLoaded}>
						<div className="primary-tile-text">{registrant.FirstName + " " + registrant.LastName}</div>
						<div className="secondary-tile-text">{registrant.Company}</div>
						<div className="checkin-icon"><i className="material-icons">check_circle</i></div>
					</Link>
				);
			} else {
				return (
					<Link key={registrant.AttendeeGuid} 
						className="attendee-search-tile" 
						to={"/attendee/registrant/" + registrant.AttendeeGuid}>
						<div className="primary-tile-text">{registrant.FirstName + " " + registrant.LastName}</div>
						<div className="secondary-tile-text">{registrant.Company}</div>						
					</Link>
				);
			}
		});
	}

	// Generate loading, errors text
	generateMessageText() {
		const { searchLoading, hasSearched, searchError, regList } = this.props;
		if(searchLoading){
			return (<Loading height={112} width={112} color="#f5f5f5" />);
		}
		if(hasSearched && !searchError && regList.length === 0) {	
			return (
				<div className="msg-text m-t-15">
					Sorry! No registrations found...
					{ this.props.allowWalkIns ? 
						<div className="register-now-action m-t-15 method-walkin"><Link to="/attendee/walkin">Register Now</Link></div>
						:
						""
					}
				</div>
			);			
		}
		if(hasSearched && searchError) {			
			return (
				<div className="msg-text m-t-15">
					Uh-Oh! We're having some issues searching...
				</div>
			);			
		}
	}

	render() {		
		return (
			<div className="attendee-search container-fluid">
				<BackButton />
				<div className="row">
					<div className="instruction-text col-xs-12">
						Please enter your { this.getSearchTerm() } to begin searching.
					</div>
				</div>
				<div className="row attendee-search-box text-center m-t-10">
					<form className="attendee-search-form" onSubmit={this.handleSearchSubmit} >
						<div className="inline-search">
							<input type="text" autoFocus 
								autoComplete="off" spellCheck="off"
								className="attendee-form attendee-search-input" onChange={this.handleInputChange} value={this.state.searchTerm} />
							<button type="submit">
								<i className="material-icons search-icon">search</i>
							</button>
						</div>
					</form>
					{ this.generateMessageText() }					
				</div>
				{
					(this.props.regList && this.props.regList.length > 0) ?
					<div className="row attendee-search-list card-container m-t-15">
						{this.getRegistrantList()}
					</div> :
					""
				}				
			</div>
		);
	}
}

AttendeeSearch.contextTypes = {
	router : PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	const { registrant: { registrantList, hasSearched, searchError, searchLoading }, settings: { configuration : { AttendeeMode: { WalkIns, SearchBy} }}} = state;
	return {
		regList : registrantList,
		searchBy : SearchBy,
		allowWalkIns : WalkIns,
		hasSearched : hasSearched,
		searchError : searchError,
		searchLoading : searchLoading
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		searchRegistrants : (q, f) => dispatch(searchRegistrants(q, f)),
		sendNotification : (msg, isSuccess) => dispatch(sendNotification(msg, isSuccess))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeSearch);