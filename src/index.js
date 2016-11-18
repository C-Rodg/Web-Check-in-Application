import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from './containers/Root';
import configureStore from './store/configureStore';
import './styles/core.scss';

// Web.Config that points to Launch.html
require('file-loader?name=[name].config!./web.config');


const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
	<Root store={store} history={history} />,
	document.getElementById('app')
);