import React, { Component } from 'react';
import { connect } from 'react-redux';

import AttendeeTile from '../components/AttendeeTile';
import TableSort from '../components/TableSort';

class AdminResults extends Component {
	constructor(props) {
		super(props);

		this.state = { sort : "First Name", sortDirection : "down" };

		this.getRegistrantList = this.getRegistrantList.bind(this);
		this.getTableTitleText = this.getTableTitleText.bind(this);
		this.handleChangeSort = this.handleChangeSort.bind(this);
		this.handleChangeSortDirection = this.handleChangeSortDirection.bind(this);
	}

	getRegistrantList(){
		return this.registrantList.map((registrant) => {
			return (
				<AttendeeTile />
			);
		});
	}

	handleChangeSortDirection(direction) {
		const newDirection = (direction === 'down' ? 'up' : 'down');
		this.setState({
			sortDirection : newDirection
		});
	}

	handleChangeSort(event) {		
		this.setState({
			sort : event.target.id,
			sortDirection : "down"
		});
	}

	getTableTitleText(){
		if(this.props.searchError) {
			return (<tr><th>Uh-oh! There was an issue searching...</th></tr>);
		}
		if(!this.props.searching) {
			return (<tr><th>Ready to begin searching...</th></tr>);
		}
		if(this.props.searching && this.props.registrantList.length === 0){
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
						{ (this.registrantList && this.registrantList.length > 0) 
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
	return {
		registrantList : state.registrant.registrantList,
		searching : state.registrant.searching,
		searchError : state.registrant.searchError
	};
};

export default connect(mapStateToProps)(AdminResults);