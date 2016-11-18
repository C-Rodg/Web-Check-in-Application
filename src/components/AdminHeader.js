import React from 'react';

const AdminHeader = (props) => {
	return (
		<div className="admin-header container-fluid">
			<div className="row">
				<div className="col-xs-12 text-center title-row">
					<p className="event-name mi-38">{props.eventName}</p>
					<span className="change-mode-btn">
						<i className="material-icons mi-26">transfer_within_a_station</i>
					</span>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-6 text-left">
					Checked In: {props.checkedInNum} <span className="split">||</span> Registered: {props.registeredNum}
				</div>
				<div className="col-xs-6 text-right">
					{props.eventLocation} <span className="split">||</span> {props.eventDate}
				</div>
			</div>			
		</div>
	);
};

export default AdminHeader;