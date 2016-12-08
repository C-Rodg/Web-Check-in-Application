import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { searchRegistrants } from '../actions/cc_registrant';
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
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.regList.length === 1) {
			this.context.router.push('/attendee/registrant/' + nextProps.regList[0].AttendeeGuid);
		}
	}

	handleSearchSubmit(event) {
		event.preventDefault();
		let filter = 'both';
		if(this.props.searchBy && this.props.searchBy.toUpperCase() === 'EMAIL') {
			filter = 'email';
		} else if (this.props.searchBy && this.props.searchBy.toUpperCase() === 'LASTNAME') {
			filter = 'lastname';
		}
		this.props.searchRegistrants(this.state.searchTerm, filter);
	}

	handleInputChange(event) {
		this.setState({
			searchTerm : event.target.value
		});
	}

	getSearchTerm() {
		let searchTerm = 'email address or last name';
		if(this.props.searchBy){
			if(this.props.searchBy.toUpperCase() === 'EMAIL'){
				searchTerm = 'email address';
			} else if (this.props.searchBy.toUpperCase() === 'LASTNAME') {
				searchTerm = 'last name';
			}
		}
		return searchTerm;
	}

	getRegistrantList(){
		return this.props.regList.map((registrant) => {
			return (
				<Link key={registrant.AttendeeGuid} className="attendee-search-tile" to={"/attendee/registrant/" + registrant.AttendeeGuid}>
					<div className="primary-tile-text">{registrant.FirstName + " " + registrant.LastName}</div>
					<div className="secondary-tile-text">{registrant.Company}</div>
					{registrant.Attended ? <div className="checkin-icon"><i className="material-icons">check_circle</i></div> : "" }
				</Link>
			);
		});
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
							<input type="text" className="attendee-form attendee-search-input" onChange={this.handleInputChange} value={this.state.searchTerm} />
							<button type="submit">
								<i className="material-icons search-icon">search</i>
							</button>
						</div>
					</form>
					{
						this.props.searchLoading ? 
						<Loading color="#f5f5f5" /> :
						""
					}
					{
						(!this.props.searchLoading && this.props.hasSearched && !this.props.searchError && this.props.regList.length === 0) ?
						<div className="msg-text m-t-15">
							Sorry! No registrations found...
							{ this.props.allowWalkIns ? 
								<div className="register-now-action m-t-15 method-walkin"><Link to="/attendee/walkin">Register Now</Link></div>
								:
								""
							}
						</div>
						:
						""
					}
					{
						(this.props.searchError && this.props.hasSearched) ? 
						<div className="msg-text m-t-15">
							Uh-Oh! We're having some issues searching...
						</div>
						: 
						""
					}
				</div>
				{
					(this.props.regList && this.props.regList.length > 0) ?
					<div className="row attendee-search-list card-container m-t-10">
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
	return {
		regList : state.registrant.registrantList,
		searchBy : state.settings.configuration.AttendeeMode.Search,
		allowWalkIns : state.settings.configuration.AttendeeMode.WalkIns,
		hasSearched : state.registrant.hasSearched,
		searchError : state.registrant.searchError,
		searchLoading : state.registrant.searchLoading
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		searchRegistrants : (q, f) => dispatch(searchRegistrants(q, f))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeSearch);