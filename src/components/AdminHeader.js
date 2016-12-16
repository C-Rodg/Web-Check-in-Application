import React from 'react';
import { Link } from 'react-router';

const AdminHeader = (props) => {
	return (
		<div className="admin-header container-fluid clearfix">
			<div className="row">
				<div className="col-xs-12 text-center title-row">
					<p className="event-name">{props.eventName}</p>					
				</div>
			</div>
			<div className="row">
				<div className="col-xs-6 text-left hidden-xs-down">
					Checked In: {props.checkedInNum} 
					<span><span className="split hidden-xs-down">||</span><span className="hidden-sm-up"><br /></span></span>
					Registered: {props.registeredNum}
				</div>
				<div className="col-xs-6 text-right hidden-xs-down">
					{props.eventLocation} 
					{ (props.eventLocation && props.eventDate) ? <span> <span className="split hidden-xs-down">||</span><span className="hidden-sm-up"><br /></span></span> : "" } 
					{props.eventDate}
				</div>
			</div>			
		</div>
	);
};

export default AdminHeader;