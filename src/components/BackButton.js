import React from 'react';
import { Link } from 'react-router';

const BackButton = (props) => {
	return (
		<Link to="/attendee/welcome" className="back-btn">
			<i className="material-icons">arrow_back</i>
		</Link>
	);
};

export default BackButton;