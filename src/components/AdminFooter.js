import React from 'react';
import { Link } from 'react-router';
import NotificationBar from './NotificationBar';

const AdminFooter = (props) => {
	return (
		<div className="admin-footer container-fluid clearfix">	
			<NotificationBar text={props.notifyText} counter={props.notifyCounter} typeSuccess={props.notifyType} />				
			<div className="row branding">	
				<div className="col-xs-12 text-center branding-text">						
					<Link to="/admin/config" className="branding-settings"><i className="material-icons v-middle">settings</i></Link>
					vCheckin
					<Link to="/attendee" className="branding-switch"><i className="material-icons v-middle">transfer_within_a_station</i></Link>	
				</div>		
			</div>
		</div>
	);
};

export default AdminFooter;