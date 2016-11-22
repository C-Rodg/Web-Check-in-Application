import React from 'react';

const TableHeaders = ["First Name", "Last Name", "Company", "Email", "Type", "Checked In"];

const TableSort = (props) => {
	const arrowDirection = `keyboard_arrow_${props.sortDirection}`;
	return (
		<tr>
		{
			TableHeaders.map((header) => {
				return ( props.sort === header ?
							<th id={header} onClick={(event) => {props.changeSortDirection(props.sortDirection)}}>{header} <i className="material-icons v-middle">{arrowDirection}</i></th>
						:
							<th id={header} onClick={(event) => {props.changeSort(event)} }>{header} <i className="material-icons v-middle invisible">keyboard_arrow_down</i></th>
				);
			})
		}
		</tr>
	);
};

export default TableSort;