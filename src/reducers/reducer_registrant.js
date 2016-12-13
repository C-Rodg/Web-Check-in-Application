import _ from 'lodash';

import { 	
	LOAD_REGISTRANT_ATTENDEEGUID_START, LOAD_REGISTRANT_ATTENDEEGUID_SUCCESS, LOAD_REGISTRANT_ATTENDEEGUID_ERROR, 
	SEARCH_REGISTRANTS_START, SEARCH_REGISTRANTS_SUCCESS, SEARCH_REGISTRANTS_ERROR, 
	CHECKIN_REGISTRANT_SUCCESS, CHECKIN_REGISTRANT_ERROR,
	CHECKOUT_REGISTRANT_SUCCESS, CHECKOUT_REGISTRANT_ERROR,
	UPDATE_REGISTRANT_LIST,
	CLEAR_CURRENT_REGISTRANT,
	CLEAR_ALL_SEARCHING,
	RETURN_TO_LIST,
	SEND_NOTIFICATION
} from '../actions/cc_registrant';

const INITIAL_STATE = {
	currentRegistrant : null,
	currentError : false,
	registrantList : [],
	searchError : false,
	hasSearched : false,
	searchLoading : false,
	returnToList : 0,
	notificationCount : 0,
	notificationText : "",
	notificationSuccess : false
};

export const registrant = ( state = INITIAL_STATE, action ) => {
	switch(action.type) {	

		case SEND_NOTIFICATION:
			return {...state, 
				notificationText : action.msg,
				notificationSuccess : action.isSuccess,
				notificationCount : (state.notificationCount + 1) };

		case CLEAR_CURRENT_REGISTRANT: 
			return {...state, currentRegistrant : null};

		case CLEAR_ALL_SEARCHING:
			return {...state, currentRegistrant: null, currentError : false, registrantList : [], searchError : false, hasSearched : false, searchLoading : false };

		case UPDATE_REGISTRANT_LIST:
			return {
				...state,
				returnToList : (state.returnToList + 1),
				registrantList : registrantListReducer(state.registrantList, action)
			};

		case CHECKIN_REGISTRANT_SUCCESS:			
			return state;
		case CHECKIN_REGISTRANT_ERROR:
			return {...state, 
				notificationCount : (state.notificationCount + 1), 
				notificationText : "Sorry, we're having some issues checking this registrant in...",
				notificationSuccess : false };

		case CHECKOUT_REGISTRANT_SUCCESS:
			return state;//{...state, returnToList : true};
		case CHECKOUT_REGISTRANT_ERROR:
			return {...state, 
				notificationCount : (state.notificationCount + 1), 
				notificationText : "Sorry, we're having some issues checking this registrant out...",
				notificationSuccess : false };	

		case LOAD_REGISTRANT_ATTENDEEGUID_START: 
			return {...state, currentRegistrant : null, currentError : false};
		case LOAD_REGISTRANT_ATTENDEEGUID_SUCCESS:
			return {...state, currentRegistrant : action.payload, currentError : false};
		case LOAD_REGISTRANT_ATTENDEEGUID_ERROR:
			return {...state, currentRegistrant: null, currentError : true};

		case SEARCH_REGISTRANTS_START:
			return {...state, registrantList : [], searchError: false, searchLoading : true};
		case SEARCH_REGISTRANTS_SUCCESS:
			return {...state, registrantList : action.payload, currentRegistrant : null, searchError : false, hasSearched : true, searchLoading : false};
		case SEARCH_REGISTRANTS_ERROR:
			return {...state, registrantList : [], currentRegistrant : null, searchError : true, hasSearched : true, searchLoading : false};

		case RETURN_TO_LIST:
			return {...state, returnToList : (state.returnToList + 1)};					

		default : 
			return state;
	}
}

function registrantListReducer(state = [], action) {
	switch(action.type) {
		case UPDATE_REGISTRANT_LIST:
			const newList = _.cloneDeep(state)
			for(let el of newList){
				if(el.AttendeeGuid === action.guid){
					el.Attended = action.attended;
					break;
				}
			}
			return newList;
		default : 
			return state;
	}
}