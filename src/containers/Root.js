import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from '../routes';

export default class Root extends Component {
	render() {
		// Remove custom settings at boot
		window.localStorage.setItem('customSettings', 'FALSE');
		window.localStorage.removeItem('searchBy');
		window.localStorage.removeItem('walkIns');
		window.localStorage.removeItem('scan');
		window.localStorage.removeItem('search');
		window.localStorage.removeItem('sms');
		window.localStorage.removeItem('quickCheckin');
		window.localStorage.setItem('cameraFront', 'FALSE');

		const { store, history } = this.props;
		return (
			<Provider store={store}>
				<Router history={history} routes={routes} />
			</Provider>
		);
	}
}

Root.propTypes = {
	store : PropTypes.object.isRequired,
	history : PropTypes.object.isRequired
};