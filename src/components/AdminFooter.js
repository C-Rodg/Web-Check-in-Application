import React from 'react';
import { Link } from 'react-router';
import NotificationBar from './NotificationBar';

const AdminFooter = ({notifyText, notifyCounter, notifyType, online}) => {
	return (
		<div className="admin-footer container-fluid clearfix">	
			<NotificationBar text={notifyText} counter={notifyCounter} typeSuccess={notifyType} />				
			<div className="row branding">	
				<div className="col-xs-12 text-center branding-text">						
					<Link to="/admin/config" className="branding-settings"><i className="material-icons v-middle">settings</i></Link>
					<span className={online ? "" : "offline"}>vCheckin <i className="error-indicator material-icons">warning</i></span>
					<Link to="/attendee" className="branding-switch"><i className="material-icons v-middle">transfer_within_a_station</i></Link>	
				</div>		
			</div>
		</div>
	);
};

export default AdminFooter;