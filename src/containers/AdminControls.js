import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class AdminControls extends Component {
	constructor(props, context) {
		super(props);

		this.state = { searchQuery : "" };

		this.handleInputChange = this.handleInputChange.bind(this);
		this.onSearchRegistrant = this.onSearchRegistrant.bind(this);
	}

	onSearchRegistrant(event){
		event.preventDefault();		
		this.props.handleSearchRegistrants(this.state.searchQuery);
		if(!this.context.router.isActive('/admin/results')){
			this.context.router.push('/admin/results');
		}
		this.setState({
			searchQuery : ""
		});
	}

	handleInputChange(event){
		this.setState({ searchQuery : event.target.value });
	}

	render() {		
		return (
			<div className="admin-controls row">
				<div className="col-xs-12 col-sm-6">
					<form className="controls-search-form" onSubmit={this.onSearchRegistrant}>
						<div className="form-group">
							<input type="text" className="controls-search-box" 
								placeholder="Find a registrant..." 
								value={this.state.searchQuery}
								onChange={this.handleInputChange}
							/>
						</div>
						<button type="submit" className="controls-search-btn btn">
							<i className="material-icons">search</i>
						</button>
					</form>
				</div>
				<div className="col-xs-12 col-sm-6">
					<ul className="text-right text-center-xs m-t-15-xs">
						<Link to="/admin/results" activeClassName="controls-btn-active" className="controls-btn btn">
							<i className="material-icons">list</i><span className="hidden-md-down controls-btn-label">List</span>
						</Link>
						<Link to="/admin/walkin" activeClassName="controls-btn-active" className="controls-btn btn">
							<i className="material-icons">person_add</i><span className="hidden-md-down controls-btn-label">Walk In</span>
						</Link>
						<Link to="/admin/scan" activeClassName="controls-btn-active" className="controls-btn btn">
							<i className="material-icons">filter_center_focus</i><span className="hidden-md-down controls-btn-label">Scan</span>
						</Link>
						<Link to="/admin/stats" activeClassName="controls-btn-active" className="controls-btn btn ">
							<i className="material-icons">equalizer</i><span className="hidden-md-down controls-btn-label">Dashboard</span>
						</Link>
					</ul>
				</div>
			</div>
		);
	}
}

AdminControls.contextTypes = {
	router : PropTypes.func.isRequired
};