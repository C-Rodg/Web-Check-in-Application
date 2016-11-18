import React from 'react';

const AdminFooter = (props) => {
	return (
		<div className="admin-footer container-fluid">
			<div className="row">
				<div className="col-xs-8 col-sm-3"> {props.username} </div>
				<div className="col-xs-4 col-sm-6 text-center">vCheckin</div>
			</div>
		</div>
	);
};

export default AdminFooter;