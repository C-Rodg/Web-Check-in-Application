import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

// Import Reducers
import { settings } from './reducer_settings';

// Send to Store
const rootReducer = combineReducers({
	settings,
	routing
});

export default rootReducer;