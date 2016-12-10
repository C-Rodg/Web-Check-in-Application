import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminSettings extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="admin-settings col-xs-12">
				Settings
			</div>
		);
	}
}

export default connect()(AdminSettings);