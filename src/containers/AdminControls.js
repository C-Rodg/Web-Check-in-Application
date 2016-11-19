import React, { Component } from 'react';
import { Link } from 'react-router';

export default class AdminControls extends Component {
	render() {
		return (
			<div className="admin-controls row">
				<div className="col-xs-12 col-sm-6">
					<form className="controls-search-form">
						<div className="form-group">
							<input type="text" className="controls-search-box" placeholder="Find a registrant..."/>
						</div>
						<button type="submit" className="controls-search-btn btn">
							<i className="material-icons">search</i>
						</button>
					</form>
				</div>
				<div className="col-xs-12 col-sm-6">
					<ul className="text-right text-center-xs m-t-15-xs">
						<Link to="/admin/results" activeClassName="controls-btn-active" className="controls-btn btn">
							<i className="material-icons">list</i><span className="controls-btn-label hidden-xs-down">List</span>
						</Link>
						<Link to="/admin/walkin" activeClassName="controls-btn-active" className="controls-btn btn">
							<i className="material-icons">person_add</i><span className="controls-btn-label hidden-xs-down">Walk In</span>
						</Link>
						<Link to="/admin/scan" activeClassName="controls-btn-active" className="controls-btn btn">
							<i className="material-icons">filter_center_focus</i><span className="controls-btn-label hidden-xs-down">Scan</span>
						</Link>
						<Link to="/admin/stats" activeClassName="controls-btn-active" className="controls-btn btn">
							<i className="material-icons">equalizer</i><span className="controls-btn-label hidden-xs-down">Dashboard</span>
						</Link>
					</ul>
				</div>
			</div>
		);
	}
}