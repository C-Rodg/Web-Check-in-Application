import { GET_REGISTRATION_STATS_SUCCESS, GET_REGISTRATION_STATS_ERROR, 
	GET_EVENT_INFORMATION_SUCCESS, GET_EVENT_INFORMATION_ERROR, 
	GET_EVENT_SETTINGS_SUCCESS, GET_EVENT_SETTINGS_ERROR
	} from '../actions/cc_settings';

const INITIAL_STATS_STATE = {
	totalAttended : 0,
	totalRegistered : 0,
	preRegisteredAttended : 0,
	preRegisteredTotal : 0,
	walkInsRegistered : 0,
	walkInsAttended : 0
};

const INITIAL_CONFIG_ATTENDEE_STATE = {
	SearchBy : "both",
	Search : true,
	Scan : true,
	WalkIns : true
};

const INITIAL_CONFIG_STATE = {
	CancelledStrings : [],
	WalkInFields : [],
	AttendeeMode : INITIAL_CONFIG_ATTENDEE_STATE
};

const INITIAL_STATE = {
	configuration : INITIAL_CONFIG_STATE,
	configurationError : false,
	eventGuid : null,
	eventName : "Validar Web Check In",
	eventLocation : "Seattle, WA, USA",
	eventDate : "01/01/01",
	stats : INITIAL_STATS_STATE
};

// Settings Reducer
export const settings = ( state = INITIAL_STATE, action ) => {
	switch(action.type) {
		case GET_REGISTRATION_STATS_SUCCESS:
			return {...state, 
				stats : statsReducer(state.stats, action)
			};
		case GET_REGISTRATION_STATS_ERROR:
			return state;

		case GET_EVENT_SETTINGS_SUCCESS: 
			return {...state, 
				configurationError : false, 
				configuration : configReducer(state.configuration, action)
			};
		case GET_EVENT_SETTINGS_ERROR:
			return {...state, 
				configurationError : true, 
				configuration : configReducer(state.configuration, action)
			};

		case GET_EVENT_INFORMATION_SUCCESS:
			return {...state, 
				eventGuid : action.payload.eventGuid,
				eventName : action.payload.eventName, 
				eventLocation : action.payload.eventLocation, 
				eventDate : action.payload.eventStartDate
			};
		case GET_EVENT_INFORMATION_ERROR:
			return state;
		

		default:
			return state;
	}
}

// Configuration Reducer (nested)
function configReducer(state = INITIAL_CONFIG_STATE, action) {
	switch(action.type) {
		case GET_EVENT_SETTINGS_SUCCESS:
			return {...state, 
				CancelledStrings : action.payload.CancelledStrings, 
				WalkInFields : action.payload.WalkInFields,
				AttendeeMode : configAttendeeReducer(state.AttendeeMode, action)
			};
		case GET_EVENT_SETTINGS_ERROR:
			return {...state,
				AttendeeMode : configAttendeeReducer(state.AttendeeMode, action)
			};
		default:
			return state;
	}
}

// Attendee Mode Configuration Reducer (nested)
function configAttendeeReducer(state = INITIAL_CONFIG_ATTENDEE_STATE, action) {
	switch(action.type) {
		case GET_EVENT_SETTINGS_SUCCESS:
			return checkForOverwriteAttendeeSettings(state, action);
		case GET_EVENT_SETTINGS_ERROR:
			return checkForOverwriteAttendeeSettings(state, action);
		default:
			return state;
	}
}

// Stats Reducer (nested)
function statsReducer(state = {}, action){
	switch(action.type) {
		case GET_REGISTRATION_STATS_SUCCESS:
			const { totalAttended, totalRegistered, walkInsRegistered, walkInsAttended, preRegisteredAttended, preRegisteredTotal } = action.payload;
			return {...state,
				totalAttended,
				totalRegistered,
				preRegisteredAttended,
				preRegisteredTotal,
				walkInsRegistered,
				walkInsAttended
			};
		default:
			return state;
	}
}

// Return object with overwritten settings if needed
function checkForOverwriteAttendeeSettings(state, action){
	let newConfig;
	switch(action.type) {
		case GET_EVENT_SETTINGS_SUCCESS:						
			newConfig = Object.assign({}, state, action.payload.AttendeeMode);
			break;
		case GET_EVENT_SETTINGS_ERROR:
			newConfig = Object.assign({}, state);
			break;
		default:
			newConfig = Object.assign({}, state);
	}	

	if(window.localStorage.getItem('customSettings') === 'TRUE'){
		let scan = window.localStorage.getItem('scan');
		let search = window.localStorage.getItem('search');	
		let walkIns = window.localStorage.getItem('walkIns');
		let searchBy = window.localStorage.getItem('searchBy');

		if(scan === 'TRUE') {
			newConfig.Scan = true;
		} else if (scan === 'FALSE') {
			newConfig.Scan = false;
		}

		if(search === 'TRUE') {
			newConfig.Search = true;
		} else if (search === 'FALSE') {
			newConfig.Search = false;
		}

		if(walkIns === 'TRUE') {
			newConfig.WalkIns = true;
		} else if (walkIns === 'FALSE') {
			newConfig.WalkIns = false;
		}

		if(searchBy) {
			newConfig.SearchBy = searchBy;
		}
	}	
	return newConfig;
}