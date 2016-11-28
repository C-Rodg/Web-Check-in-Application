import { LOAD_REGISTRANT_BADGEID_SUCCESS, LOAD_REGISTRANT_BADGEID_ERROR, LOAD_REGISTRANT_REGID_SUCCESS, LOAD_REGISTRANT_REGID_ERROR, LOAD_REGISTRANT_ATTENDEEGUID_SUCCESS, LOAD_REGISTRANT_ATTENDEEGUID_ERROR, SEARCH_REGISTRANTS_START, SEARCH_REGISTRANTS_SUCCESS, SEARCH_REGISTRANTS_ERROR, SEARCH_REGISTRANTS_XML_SUCCESS, SEARCH_REGISTRANTS_XML_ERROR, UPSERT_REGISTRANT_SUCCESS, UPSERT_REGISTRANT_ERROR, LIST_RANDOM_REGISTRANTS_SUCCESS, LIST_RANDOM_REGISTRANTS_ERROR, CLEAR_CURRENT_REGISTRANT } from '../actions/cc_registrant';

const INITIAL_STATE = {
	currentRegistrant : null,
	registrantList : [],
	searchError : false,
	searching : false,
	searchLoading : false,
	walkInMode : false,
};

export const registrant = ( state = INITIAL_STATE, action ) => {
	switch(action.type) {

		case LOAD_REGISTRANT_BADGEID_SUCCESS:
			return state;
		case LOAD_REGISTRANT_BADGEID_ERROR:
			return state;

		case LOAD_REGISTRANT_REGID_SUCCESS:
			return state;
		case LOAD_REGISTRANT_REGID_ERROR:
			return state;

		case LOAD_REGISTRANT_ATTENDEEGUID_SUCCESS:
			return {...state, currentRegistrant : action.payload};
		case LOAD_REGISTRANT_ATTENDEEGUID_ERROR:
			return state;

		case SEARCH_REGISTRANTS_START:
			return {...state, registrantList : [], searchError: false, searchLoading : true};
		case SEARCH_REGISTRANTS_SUCCESS:
			return {...state, registrantList : action.payload, currentRegistrant : null, searchError : false, searching : true};
		case SEARCH_REGISTRANTS_ERROR:
			return {...state, registrantList : [], currentRegistrant : null, searchError : true, searching : true};

		case SEARCH_REGISTRANTS_XML_SUCCESS:
			return state;
		case SEARCH_REGISTRANTS_XML_ERROR:
			return state;

		case UPSERT_REGISTRANT_SUCCESS:
			return state;
		case UPSERT_REGISTRANT_ERROR:
			return state;

		case LIST_RANDOM_REGISTRANTS_SUCCESS:
			return state;
		case LIST_RANDOM_REGISTRANTS_ERROR:
			return state;

		case CLEAR_CURRENT_REGISTRANT: 
			return {...state, currentRegistrant : null};

		default : 
			return state;
	}
}