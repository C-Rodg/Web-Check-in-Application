import React from 'react';
import NotificationBar from './NotificationBar';

const AdminFooter = (props) => {
	return (
		<div className="admin-footer container-fluid clearfix">	
			<NotificationBar text={props.notifyText} counter={props.notifyCounter} typeSuccess={props.notifyType} />				
			<div className="row branding">				
				<div className="col-xs-12 text-center">vCheckin</div>
			</div>
		</div>
	);
};

export default AdminFooter;