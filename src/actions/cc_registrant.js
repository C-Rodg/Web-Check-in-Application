import { axios } from './utilities_httpRequest';

//------------------------- TYPES -------------------------//

export const LOAD_REGISTRANT_BADGEID_SUCCESS = 'LOAD_REGISTRANT_BADGEID_SUCCESS';
export const LOAD_REGISTRANT_BADGEID_ERROR   = 'LOAD_REGISTRANT_BADGEID_ERROR';

export const LOAD_REGISTRANT_REGID_SUCCESS = 'LOAD_REGISTRANT_REGID_SUCCESS';
export const LOAD_REGISTRANT_REGID_ERROR   = 'LOAD_REGISTRANT_REGID_ERROR';

export const LOAD_REGISTRANT_ATTENDEEGUID_SUCCESS = 'LOAD_REGISTRANT_ATTENDEEGUID_SUCCESS';
export const LOAD_REGISTRANT_ATTENDEEGUID_ERROR   = 'LOAD_REGISTRANT_ATTENDEEGUID_ERROR';

export const SEARCH_REGISTRANTS_SUCCESS = 'SEARCH_REGISTRANTS_SUCCESS';
export const SEARCH_REGISTRANTS_ERROR = 'SEARCH_REGISTRANTS_ERROR';

export const SEARCH_REGISTRANTS_XML_SUCCESS = 'SEARCH_REGISTRANTS_XML_SUCCESS';
export const SEARCH_REGISTRANTS_XML_ERROR = 'SEARCH_REGISTRANTS_XML_ERROR';

export const UPSERT_REGISTRANT_SUCCESS = 'UPSERT_REGISTRANT_SUCCESS';
export const UPSERT_REGISTRANT_ERROR = 'UPSERT_REGISTRANT_ERROR';

export const LIST_RANDOM_REGISTRANTS_SUCCESS = 'LIST_RANDOM_REGISTRANT_SUCCESS';
export const LIST_RANDOM_REGISTRANTS_ERROR = 'LIST_RANDOM_REGISTRANT_ERROR';


//-------------------- ACTION CREATORS --------------------//


export function loadRegistrantByBadgeId(badgeId) {
	return function(dispatch) {
		axios.post(`methods.asmx/LoadRegistrantWithBadgeId`, {})
			.then((response) => {
				dispatch(loadRegistrantByBadgeIdSuccess(response));
			})
			.catch((err) => {
				dispatch(loadRegistrantByBadgeIdError(err));
			});
	};
}

function loadRegistrantByBadgeIdSuccess(response) {
	return {
		type : LOAD_REGISTRANT_BADGEID_SUCCESS,
		payload : response.data.d
	};
}

function loadRegistrantByBadgeIdError(err) {
	return {
		type : LOAD_REGISTRANT_BADGEID_ERROR,
		payload : err
	};
}


export function loadRegistrantByRegId(regId) {
	return function(dispatch) {
		axios.post(`methods.asmx/LoadRegistrantWithRegistrantId`, {})
			.then((response) => {
				dispatch(loadRegistrantByRegIdSuccess(response));
			})
			.catch((err) => {
				dispatch(loadRegistrantByRegIdError(err));
			});
	};
}

function loadRegistrantByRegIdSuccess(response) {
	return {
		type : LOAD_REGISTRANT_REGID_SUCCESS,
		payload : response.data.d
	};
}

function loadRegistrantByRegIdError(err) {
	return {
		type : LOAD_REGISTRANT_REGID_ERROR,
		payload : err
	};
}


export function loadRegistrantByAttendeeGuid(atGuid) {
	return function(dispatch) {
		axios.post(`methods.asmx/LoadRegistrantWithAttendeeGuid`, {})
			.then((response) => {
				dispatch(loadRegistrantByAttendeeGuidSuccess(response));
			})
			.catch((err) => {
				dispatch(loadRegistrantByAttendeeGuidError(err));
			});
	};
}

function loadRegistrantByAttendeeGuidSuccess(response) {
	return {
		type : LOAD_REGISTRANT_ATTENDEEGUID_SUCCESS,
		payload : response.data.d
	};
}

function loadRegistrantByAttendeeGuidError(err) {
	return {
		type : LOAD_REGISTRANT_ATTENDEEGUID_ERROR,
		payload : err
	};
}


export function searchRegistrants(data) {
	return function(dispatch) {
		axios.post(`methods.asmx/SearchRegistrants`, {})
			.then((response) => {
				dispatch(searchRegistrantsSuccess(response));
			})
			.catch((err) => {
				dispatch(searchRegistrantsError(err));
			});
	};
}

function searchRegistrantsSuccess(response) {
	return {
		type : SEARCH_REGISTRANTS_SUCCESS,
		payload : response.data.d
	};
}

function searchRegistrantsError(err) {
	return {
		type : SEARCH_REGISTRANTS_ERROR,
		payload : err
	};
}


export function searchRegistrantsXml(data) {
	return function(dispatch) {
		axios.post(`methods.asmx/SearchRegistrantsXml`, {})
			.then((response) => {
				dispatch(searchRegistrantsXmlSuccess(response));
			})
			.catch((err) => {
				dispatch(searchRegistrantsXmlError(err));
			});
	};
}

function searchRegistrantsXmlSuccess(response) {
	return {
		type : SEARCH_REGISTRANTS_XML_SUCCESS,
		payload : response.data.d
	};
}

function searchRegistrantsXmlError(err) {
	return {
		type : SEARCH_REGISTRANTS_XML_ERROR,
		payload : err
	};
}

export function upsertRegistrant(registrant) {
	return function(dispatch) {
		axios.post(`methods.asmx/UpsertRegistrant`, {})
			.then((response) => {
				dispatch(upsertRegistrantSuccess(response));
			})
			.catch((err) => {
				dispatch(upsertRegistrantError(err));
			});
	};
}

function upsertRegistrantSuccess(response) {
	return {
		type : UPSERT_REGISTRANT_SUCCESS,
		payload : response.data.d
	};
}

function upsertRegistrantError(err) {
	return {
		type : UPSERT_REGISTRANT_ERROR,
		payload : err
	};
}

export function listRandomRegistrants(data) {
	return function(dispatch) {
		axios.post(`methods.asmx/ListRandomRegistrants`, {})
			.then((response) => {
				dispatch(listRandomRegistrantsSuccess(response));
			})
			.catch((err) => {
				dispatch(listRandomRegistrantsError(err));
			});
	};
}

function listRandomRegistrantsSuccess(response) {
	return {
		type : LIST_RANDOM_REGISTRANTS_SUCCESS,
		payload : response.data.d
	};
}

function listRandomRegistrantsError(err) {
	return {
		type : LIST_RANDOM_REGISTRANTS_ERROR,
		payload : err
	};
}