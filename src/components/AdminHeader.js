import React from 'react';

const AdminHeader = ({eventName, checkedInNum, registeredNum}) => {
	return (
		<div className="admin-header container-fluid clearfix">
			<div className="row text-center">
				<div className="col-xs-12 event-name">
					{eventName}
				</div>
				<div className="col-xs-12 stats">
					Checked In: {checkedInNum} | Registered: {registeredNum}
				</div>							
			</div>								
		</div>
	);
};

export default AdminHeader;