import React from 'react';
import { Link } from 'react-router';

const AttendeeTile = (props) => {
	return (		
		
			<Link to={"/admin/registrant/" + props.guid} className="table-a-row">
				<td>{props.firstName}</td>
				<td>{props.lastName}</td>
				<td>{props.company}</td>
				<td>{props.email}</td>
				<td>{props.attendeeType}</td>
				<td><i className={"material-icons mi-26 " + (props.checkedIn ? "" : "invisible")}>check_circle</i></td>
			</Link>
		
	);
};

export default AttendeeTile;