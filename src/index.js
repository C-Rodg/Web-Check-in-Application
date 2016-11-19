import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from './containers/Root';
import configureStore from './store/configureStore';
import './styles/core.scss';

// Web.Config that points to Launch.html and Features Configuration
require('file-loader?name=[name].config!./web.config');
require('file-loader?name=[name].manifest!./features.manifest');


const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
	<Root store={store} history={history} />,
	document.getElementById('app')
);