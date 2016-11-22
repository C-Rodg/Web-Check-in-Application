import React from 'react';

const AttendeeTile = (props) => {
	return (
		<tr>
			<td>FIRSTNAME</td>
			<td>LASTNAME</td>
			<td>COMPANY</td>
			<td>EMAIL</td>
			<td>AT-TYPE</td>
			<td><i className="material-icons mi-26">check_circle</i> if checked in</td>
		</tr>
	);
};

export default AttendeeTile;