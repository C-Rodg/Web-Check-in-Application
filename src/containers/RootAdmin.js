import React, { Component } from 'react';

import AdminHeader from '../components/AdminHeader';
import AdminControls from './AdminControls';
import AdminFooter from '../components/AdminFooter';

export default class RootAdmin extends Component {
	render(){
		return (
			<div className="root-admin">
				<AdminHeader eventName={"Tableau Conference 2016"} checkedInNum={129} registeredNum={1035} eventDate={"01/24/17"} eventLocation={"Seattle, WA"}/>
				<div className="admin-body container-fluid">
					<AdminControls />
					<div className="card-body row">
						{this.props.children}
					</div>
				</div>
				<AdminFooter username={"bsimmons@validar.com"} />
			</div>
		);
	}
}