import React from 'react';
import { Link } from 'react-router';

const AdminHeader = (props) => {
	return (
		<div className="admin-header container-fluid clearfix">
			<div className="row">
				<div className="col-xs-12 text-center title-row">
					<p className="event-name mi-38">{props.eventName}</p>
					<Link to="/attendee">
						<span className="change-mode-btn">
							<i className="material-icons mi-26">transfer_within_a_station</i>
						</span>
					</Link>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-6 text-left">
					Checked In: {props.checkedInNum} 
					<span><span className="split hidden-xs-down">||</span><span className="hidden-sm-up"><br /></span></span>
					Registered: {props.registeredNum}
				</div>
				<div className="col-xs-6 text-right">
					{props.eventLocation} 
					{ (props.eventLocation && props.eventDate) ? <span> <span className="split hidden-xs-down">||</span><span className="hidden-sm-up"><br /></span></span> : "" } 
					{props.eventDate}
				</div>
			</div>			
		</div>
	);
};

export default AdminHeader;