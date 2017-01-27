import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from './components/App';
import Login from './containers/Login';
import RootAdmin from './containers/RootAdmin';
import AdminResults from './containers/AdminResults';
import AdminStats from './containers/AdminStats';
import WalkInForm from './containers/WalkInForm';
import AdminScan from './containers/AdminScan';
import AdminRegistrant from './containers/AdminRegistrant';
import RootAttendee from './containers/RootAttendee';
import AttendeeSearch from './containers/AttendeeSearch';
import AttendeeScan from './containers/AttendeeScan';
import AttendeeWalkIn from './containers/AttendeeWalkIn';
import AttendeeWelcome from './containers/AttendeeWelcome';
import AttendeePassword from './containers/AttendeePassword';
import AttendeeRegistrant from './containers/AttendeeRegistrant';
import AdminSettings from './containers/AdminSettings';


export default (
	<Route path="/" component={App}>
		<IndexRedirect to="/login" />
		<Route path="admin" component={RootAdmin}>
			<IndexRedirect to="config" />
			<Route path="results" component={AdminResults} />
			<Route path="stats" component={AdminStats} />
			<Route path="walkin" component={WalkInForm} />
			<Route path="scan" component={AdminScan} />
			<Route path="config" component={AdminSettings} />
			<Route path="registrant/:atGuid" component={AdminRegistrant} />
		</Route>
		<Route path="attendee" component={RootAttendee}>
			<IndexRedirect to="welcome" />
			<Route path="welcome" component={AttendeeWelcome} />
			<Route path="search" component={AttendeeSearch} />
			<Route path="scan" component={AttendeeScan} />
			<Route path="walkin" component={AttendeeWalkIn} />
			<Route path="password" component={AttendeePassword} />
			<Route path="registrant/:atGuid" component={AttendeeRegistrant} />
		</Route>
		<Route path="login" component={Login} />
	</Route>
);