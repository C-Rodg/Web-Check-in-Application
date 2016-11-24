import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getRegistrationStats } from '../actions/cc_settings';
import DonutChart from '../components/DonutChart';

class AdminStats extends Component {

	componentDidMount() {
		this.props.checkRegistrationStats();
	}

	render(){
		return (
			<div className="col-xs-12 text-center admin-stats m-t-15 m-b-15">
				<div>
					<DonutChart donutLabel={"here"} value={(Math.round(this.props.totalAttended / this.props.totalRegistered * 100)) || 0 } />
				</div>
				<div className="m-t-15 total">
					<span className="stats-number">{this.props.totalAttended}/{this.props.totalRegistered}</span><span className="stats-label"> attended</span>
				</div>				
				<div className="sub-number">
					<span className="stats-number">{this.props.preRegisteredAttended}/{this.props.preRegisteredTotal}</span><span className="stats-label"> registered</span>
				</div>
				<div className="sub-number">
					<span className="stats-number">{this.props.walkInsAttended}/{this.props.walkInsRegistered}</span><span className="stats-label"> walk ins</span>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		totalAttended : state.settings.stats.totalAttended,
		totalRegistered : state.settings.stats.totalRegistered,
		preRegisteredAttended : state.settings.stats.preRegisteredAttended,
		preRegisteredTotal : state.settings.stats.preRegisteredTotal,
		walkInsAttended : state.settings.stats.walkInsAttended,
		walkInsRegistered : state.settings.stats.walkInsRegistered
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		checkRegistrationStats : () => dispatch(getRegistrationStats())
	};
};

const StatsApp = connect(mapStateToProps, mapDispatchToProps)(AdminStats);

StatsApp.defaultProps = {
	totalAttended : 0,
	totalRegistered : 0,
	preRegisteredAttended : 0,
	preRegisteredTotal : 0,
	walkInsAttended : 0,
	walkInsRegistered : 0
};

export default StatsApp;