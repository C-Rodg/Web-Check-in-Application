import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from './components/App';
import RootAdmin from './containers/RootAdmin';
import AdminResults from './containers/AdminResults';
import AdminStats from './containers/AdminStats';
import AdminWalkIn from './containers/AdminWalkIn';
import AdminScan from './containers/AdminScan';
import AdminRegistrant from './containers/AdminRegistrant';
import RootAttendee from './containers/RootAttendee';
import AttendeeSearch from './containers/AttendeeSearch';
import AttendeeScan from './containers/AttendeeScan';
import AttendeeWalkIn from './containers/AttendeeWalkIn';
import AttendeeWelcome from './containers/AttendeeWelcome';
import AttendeePassword from './containers/AttendeePassword';

export default (
	<Route path="/" component={App}>
		<IndexRedirect to="/admin" />
		<Route path="admin" component={RootAdmin}>
			<IndexRedirect to="results" />
			<Route path="results" component={AdminResults} />
			<Route path="stats" component={AdminStats} />
			<Route path="walkin" component={AdminWalkIn} />
			<Route path="scan" component={AdminScan} />
			<Route path="registrant/:atGuid" component={AdminRegistrant} />
		</Route>
		<Route path="attendee" component={RootAttendee}>
			<IndexRedirect to="welcome" />
			<Route path="welcome" component={AttendeeWelcome} />
			<Route path="search" component={AttendeeSearch} />
			<Route path="scan" component={AttendeeScan} />
			<Route path="walkin" component={AttendeeWalkIn} />
			<Route path="password" component={AttendeePassword} />
		</Route>
	</Route>
);