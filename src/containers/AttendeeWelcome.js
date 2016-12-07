import React, { Component } from 'react';
import { Link } from 'react-router';

const camera = true;
const walkIns = true;

export default class AttendeeWelcome extends Component {
	render() {
		return (
			<div className="attendee-welcome container-fluid">
				<div className="row">
					<div className="instruction-text col-xs-12">
						Please select your method of checking in.
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-6 offset-sm-3">
						<div className="select-entry-method text-center">
							<Link to="/attendee/search" className={"method-search " + (camera ? "" : "one-method")}>
								<div className="method-icon">
									<i className="material-icons">search</i>
								</div>
								<div className="method-text">
									Search
								</div>
							</Link>
							{
								camera ? 
								<Link to="/attendee/scan" className="method-scan">
									<div className="method-icon">
										<i className="material-icons">filter_center_focus</i>
									</div>
									<div className="method-text">							
										Scan
									</div>
								</Link> :
								""
							}							
						</div>						
					</div>
				</div>
				{
					walkIns ?
					<div className="row">
						<div className="col-xs-12 col-sm-6 offset-sm-3 method-walkin text-center">
							<Link to="/attendee/walkin">
								Not registered?<br />Register here.
							</Link>
						</div>
					</div> :
					""
				}							
			</div>
		);
	}
}