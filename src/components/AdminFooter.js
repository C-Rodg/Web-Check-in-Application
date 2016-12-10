import React from 'react';
import { Link } from 'react-router';
import NotificationBar from './NotificationBar';

const AdminFooter = (props) => {
	return (
		<div className="admin-footer container-fluid clearfix">	
			<NotificationBar text={props.notifyText} counter={props.notifyCounter} typeSuccess={props.notifyType} />				
			<div className="row branding">	
				<div className="col-xs-1"><Link to="/admin/config"><i className="material-icons v-middle m-l-n-5">settings</i></Link></div>			
				<div className="col-xs-10 text-center">vCheckin</div>
			</div>
		</div>
	);
};

export default AdminFooter;