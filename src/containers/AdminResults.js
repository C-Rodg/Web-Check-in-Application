import React, { Component } from 'react';

export default class AdminResults extends Component {
	render(){
		return (
			<div className="col-xs-12">
				<div className="results-table table-responsive">
					<table className="table">
						<thead>
							<tr>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Company</th>
								<th>Email</th>
								<th>Type</th>
								<th>Checked In</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>John</td>
								<td>Walker</td>
								<td>Validar</td>
								<td>jwalker@validar.com</td>
								<td>Partner</td>
								<td></td>
							</tr>
							<tr>
								<td>Tom</td>
								<td>Sewell</td>
								<td>Google, Inc.</td>
								<td>tswewellgoogs@google.com</td>
								<td>Attendee</td>
								<td><i className="material-icons mi-26">check_circle</i></td>
							</tr>
							<tr>
								<td>Janet</td>
								<td>Jackson</td>
								<td>Disney World Wide, Inc.</td>
								<td>jj@disneyww.com</td>
								<td>Attendee</td>
								<td></td>
							</tr>
							<tr>
								<td>Mike</td>
								<td>Stevens-Williams of Michigan</td>
								<td>Miscopppy Tech</td>
								<td>swmikewill@gmail.com</td>
								<td>Partner</td>
								<td><i className="material-icons mi-26">check_circle</i></td>
							</tr>
							<tr>
								<td>Jane</td>
								<td>Miller</td>
								<td>IBM Tech</td>
								<td>Miller@gmail.com</td>
								<td>Partner</td>
								<td><i className="material-icons mi-26">check_circle</i></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}