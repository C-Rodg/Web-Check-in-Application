import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getRegistrationStats } from '../actions/cc_settings';
import DonutChart from '../components/DonutChart';

class AdminStats extends Component {

	// Check for new stats
	componentDidMount() {
		this.props.checkRegistrationStats();
	}

	render(){
		const { totalAttended, totalRegistered, preRegisteredAttended, preRegisteredTotal, walkInsAttended, walkInsRegistered } = this.props;
		return (
			<div className="col-xs-12 text-center admin-stats m-t-15 m-b-15">
				<div>
					<DonutChart donutLabel={"here"} value={(Math.round(totalAttended / totalRegistered * 100)) || 0 } />
				</div>
				<div className="m-t-15 total">
					<span className="stats-number">{totalAttended}/{totalRegistered}</span><span className="stats-label"> attended</span>
				</div>				
				<div className="sub-number">
					<span className="stats-number">{preRegisteredAttended}/{preRegisteredTotal}</span><span className="stats-label"> registered</span>
				</div>
				<div className="sub-number">
					<span className="stats-number">{walkInsAttended}/{walkInsRegistered}</span><span className="stats-label"> walk ins</span>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { stats: { totalAttended, totalRegistered, preRegisteredAttended, preRegisteredTotal, walkInsAttended, walkInsRegistered } } = state.settings;
	return {
		totalAttended,
		totalRegistered,
		preRegisteredAttended,
		preRegisteredTotal,
		walkInsAttended,
		walkInsRegistered
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