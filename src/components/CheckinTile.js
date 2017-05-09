import React from 'react';
import { Link } from 'react-router';

const CheckinTile = (props) => {
	return (		
		
			<Link className="table-a-row check-in-tile" to={"/admin/registrant/" + props.guid}>
				<td onClick={(ev) => props.onRegClick(ev, props)}><i className={"material-icons mi-26 " + (props.checkedIn ? "" : "not-here")}>check_circle</i></td>
				<td>{props.firstName}</td>
				<td>{props.lastName}</td>
				<td>{props.company}</td>
				<td>{props.email}</td>
				<td>{props.attendeeType}</td>				
			</Link>
		
	);
};

export default CheckinTile;