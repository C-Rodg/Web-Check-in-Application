import { GET_REGISTRATION_STATS_SUCCESS, GET_REGISTRATION_STATS_ERROR, GET_EVENT_INFORMATION_SUCCESS, GET_EVENT_INFORMATION_ERROR, GET_EVENT_SETTINGS_SUCCESS, GET_EVENT_SETTINGS_ERROR } from '../actions/cc_settings';

const INITIAL_STATS_STATE = {
	totalAttended : 0,
	totalRegistered : 0,
	preRegisteredAttended : 0,
	preRegisteredTotal : 0,
	walkInsRegistered : 0,
	walkInsAttended : 0
};

const INITIAL_CONFIG_STATE = {
	CancelledStrings : [],
	WalkInFields : [],
	AttendeeMode : {
		SearchBy : "both",
		Search : true,
		Scan : true,
		WalkIns : true
	}
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

export const settings = ( state = INITIAL_STATE, action ) => {
	switch(action.type) {
		case GET_REGISTRATION_STATS_SUCCESS:
			return {...state, 
				stats : statsReducer(state.stats, action)
			};
		case GET_REGISTRATION_STATS_ERROR:
			return state;

		case GET_EVENT_SETTINGS_SUCCESS: 
			return {...state, configurationError : false, configuration : action.payload};
		case GET_EVENT_SETTINGS_ERROR:
			return {...state, configurationError : true};

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

function statsReducer(state = {}, action){
	const { totalAttended, totalRegistered, walkInsRegistered, walkInsAttended, preRegisteredAttended, preRegisteredTotal } = action.payload;
	return {...state,
		totalAttended,
		totalRegistered,
		preRegisteredAttended,
		preRegisteredTotal,
		walkInsRegistered,
		walkInsAttended
	};
}