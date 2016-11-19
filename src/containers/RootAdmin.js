import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdminHeader from '../components/AdminHeader';
import AdminControls from './AdminControls';
import AdminFooter from '../components/AdminFooter';

import { getEventInformation } from '../actions/cc_settings';

class RootAdmin extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log("GETTING EVENT INFO");
		this.props.getEventInformation();
	}

	render(){
		return (
			<div className="root-admin">
				<AdminHeader eventName={"Tableau Conference 2016"} checkedInNum={129} registeredNum={1035} eventDate={"01/24/17"} eventLocation={"Seattle, WA"}/>
				<div className="admin-body container-fluid">
					<AdminControls />
					<div className="card-body row">
						{this.props.children}
					</div>
				</div>
				<AdminFooter username={"bsimmons@validar.com"} />
			</div>
		);
	}
}

// const mapStateToProps = (state) => {
// 	return {
// 		eventName 
// 	}
// }

const mapDispatchToProps = (dispatch) => {
	return {
		getEventInformation : data => dispatch(getEventInformation(data))
	};
};

export default connect(null, mapDispatchToProps)(RootAdmin);