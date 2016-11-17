import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

// Import Reducers

// Send to Store
const rootReducer = combineReducers({
	routing
});

export default rootReducer;