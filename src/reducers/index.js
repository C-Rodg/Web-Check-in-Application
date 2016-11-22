import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

// Import Reducers
import { settings } from './reducer_settings';
import { registrant } from './reducer_registrant';

// Send to Store
const rootReducer = combineReducers({
	settings,
	registrant,
	routing
});

export default rootReducer;