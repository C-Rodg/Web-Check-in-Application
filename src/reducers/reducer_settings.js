import { GET_REGISTRATION_STATS_SUCCESS, GET_REGISTRATION_STATS_ERROR, GET_EVENT_INFORMATION_SUCCESS, GET_EVENT_INFORMATION_ERROR, GET_EVENT_SETTINGS_SUCCESS, GET_EVENT_SETTINGS_ERROR };

const INITIAL_STATE = {
	configuration : null
};

export const settings = ( state = INITIAL_STATE, action ) => {
	switch(action.type) {
		case GET_REGISTRATION_STATS_SUCCESS:
			return state;
		case GET_REGISTRATION_STATS_ERROR:
			return state;

		case GET_EVENT_SETTINGS_SUCCESS: 
			return state;
		case GET_EVENT_SETTINGS_ERROR:
			return state;

		case GET_EVENT_INFORMATION_SUCCESS:
			return state;
		case GET_EVENT_INFORMATION_ERROR:
			return state;

		default:
			return state;
	}
}