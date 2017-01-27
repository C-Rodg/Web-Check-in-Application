import React from 'react';

import TableFields from './TableFields';

const TableSort = (props) => {
	const arrowDirection = `keyboard_arrow_${props.sortDirection}`;
	return (
		<tr>
		{
			TableFields.map((header) => {
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