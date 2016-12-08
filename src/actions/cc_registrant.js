import { axios } from './utilities_httpRequest';

//------------------------- TYPES -------------------------//

export const LOAD_REGISTRANT_BADGEID_SUCCESS = 'LOAD_REGISTRANT_BADGEID_SUCCESS';
export const LOAD_REGISTRANT_BADGEID_ERROR   = 'LOAD_REGISTRANT_BADGEID_ERROR';

export const LOAD_REGISTRANT_REGID_SUCCESS = 'LOAD_REGISTRANT_REGID_SUCCESS';
export const LOAD_REGISTRANT_REGID_ERROR   = 'LOAD_REGISTRANT_REGID_ERROR';

export const LOAD_REGISTRANT_ATTENDEEGUID_START = 'LOAD_REGISTRANT_ATTENDEEGUID_START';
export const LOAD_REGISTRANT_ATTENDEEGUID_SUCCESS = 'LOAD_REGISTRANT_ATTENDEEGUID_SUCCESS';
export const LOAD_REGISTRANT_ATTENDEEGUID_ERROR   = 'LOAD_REGISTRANT_ATTENDEEGUID_ERROR';

export const SEARCH_REGISTRANTS_START = 'SEARCH_REGISTRANTS_START';
export const SEARCH_REGISTRANTS_SUCCESS = 'SEARCH_REGISTRANTS_SUCCESS';
export const SEARCH_REGISTRANTS_ERROR = 'SEARCH_REGISTRANTS_ERROR';

export const SEARCH_REGISTRANTS_XML_SUCCESS = 'SEARCH_REGISTRANTS_XML_SUCCESS';
export const SEARCH_REGISTRANTS_XML_ERROR = 'SEARCH_REGISTRANTS_XML_ERROR';

export const UPSERT_REGISTRANT_SUCCESS = 'UPSERT_REGISTRANT_SUCCESS';
export const UPSERT_REGISTRANT_ERROR = 'UPSERT_REGISTRANT_ERROR';

export const LIST_RANDOM_REGISTRANTS_SUCCESS = 'LIST_RANDOM_REGISTRANT_SUCCESS';
export const LIST_RANDOM_REGISTRANTS_ERROR = 'LIST_RANDOM_REGISTRANT_ERROR';

export const CHECKIN_REGISTRANT_SUCCESS = 'CHECKIN_REGISTRANT_SUCCESS';
export const CHECKIN_REGISTRANT_ERROR = 'CHECKIN_REGISTRANT_ERROR';

export const CHECKOUT_REGISTRANT_SUCCESS = 'CHECKOUT_REGISTRANT_SUCCESS';
export const CHECKOUT_REGISTRANT_ERROR = 'CHECKOUT_REGISTRANT_ERROR';

export const UPDATE_REGISTRANT_LIST = 'UPDATE_REGISTRANT_LIST';

export const CLEAR_CURRENT_REGISTRANT = 'CLEAR_CURRENT_REGISTRANT';
export const CLEAR_ALL_SEARCHING = 'CLEAR_ALL_SEARCHING';

export const SEND_NOTIFICATION = 'SEND_NOTIFICATION';
export const RETURN_TO_LIST = 'RETURN_TO_LIST';


//-------------------- ACTION CREATORS --------------------//

export function sendNotification(msg, isSuccess) {
	return {
		type : SEND_NOTIFICATION,
		msg,
		isSuccess
	};
}

// Not Implemented
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

// Not Implemented
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


export function loadRegistrantByAttendeeGuid(attendeeGuid) {
	return function(dispatch) {

		dispatch(loadRegistrantByAttendeeGuidStart());

		axios.post(`methods.asmx/LoadRegistrantWithAttendeeGuid`, {attendeeGuid})
			.then((response) => {
				dispatch(loadRegistrantByAttendeeGuidSuccess(response.data.d.Registrant));
			})
			.catch((err) => {
				dispatch(loadRegistrantByAttendeeGuidError(err));
			});
	};
}

function loadRegistrantByAttendeeGuidStart() {
	return {
		type : LOAD_REGISTRANT_ATTENDEEGUID_START,
		payload : null
	};
}

function loadRegistrantByAttendeeGuidSuccess(response) {
	
	delete response.__type;

	return {
		type : LOAD_REGISTRANT_ATTENDEEGUID_SUCCESS,
		payload : response
	};
}

function loadRegistrantByAttendeeGuidError(err) {
	return {
		type : LOAD_REGISTRANT_ATTENDEEGUID_ERROR,
		payload : err
	};
}


export function searchRegistrants(searchText, filter) {
	let query;
	if (filter === 'all') {
		query = {
			Operator : "OR",
			Expressions : [{
				Column : "LastName",
				Comparison : "Contains",
				Value : searchText
			}, {
				Column : "Company",
				Comparison : "Contains",
				Value : searchText
			}, {
				Column : "Email",
				Comparison : "Contains",
				Value : searchText
			}, {
				Column : "FirstName",
				Comparison : "Contains",
				Value : searchText
			}, {
				Column : "RegistrantId",
				Comparison : "Contains",
				Value : searchText
			}]
		};
	} else if (filter === 'lastname') {
		query = {
			Operator : 'OR',
			Expressions : [{
				Column : "LastName",
				Comparison : "Equals",
				Value : searchText
			}]
		};
	} else if (filter === 'email') {
		query = {
			Operator : 'OR',
			Expressions : [{
				Column : "Email",
				Comparison : "Equals",
				Value : searchText
			}]
		};
	} else if (filter === 'both') {
		query = {
			Operator : 'OR',
			Expressions : [{
				Column : "LastName",
				Comparison : "Equals",
				Value : searchText
			}, {
				Column : "Email",
				Comparison: "Equals",
				Value : searchText
			}]
		};
	}

	let inputArg = {
		"top" : null,
		"searchGroup" : query,
		"orderBy" : [{Column : "Firstname", OrderByDirection : "Ascending"}]
	};

	return function(dispatch) {

		dispatch(startSearchRegistrants());

		axios.post(`methods.asmx/SearchRegistrants`, inputArg)
			.then((response) => {
				dispatch(searchRegistrantsSuccess(response.data.d.Registrants));
			})
			.catch((err) => {
				dispatch(searchRegistrantsError(err));
			});
	};
}

function startSearchRegistrants(){
	return {
		type : SEARCH_REGISTRANTS_START,
		payload : null
	};
}

function searchRegistrantsSuccess(response) {
	return {
		type : SEARCH_REGISTRANTS_SUCCESS,
		payload : response
	};
}

function searchRegistrantsError(err) {
	return {
		type : SEARCH_REGISTRANTS_ERROR,
		payload : err
	};
}

// Not Implemented
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

export function createWalkIn(registrant) {

	const checkedInRegistrant = Object.assign({}, registrant, {
		Attended : true,
		FirstCheckInDateTime : (new Date()),
		OnSiteModifiedDateTime : (new Date())
	});

	const inputArg = {
		registrant : checkedInRegistrant
	};

	return function(dispatch) {
		axios.post('methods.asmx/UpsertRegistrant', inputArg)
			.then((response) => {
				dispatch(sendNotification("Thank you for joining us today!", true));
				dispatch(createWalkInSuccess());							
			})
			.catch((err) => {
				dispatch(checkInRegistrantError(err));
			});
	};
}

function createWalkInSuccess(guid) {
	return {
		type : RETURN_TO_LIST,
		payload : null
	};
}

export function checkInRegistrant(registrant) {
	const checkedInRegistrant = Object.assign({}, registrant, {
		Attended : true,
		FirstCheckInDateTime : (new Date()),
		OnSiteModifiedDateTime : (new Date())
	});

	const inputArg = {
		registrant : checkedInRegistrant
	};

	return function(dispatch) {
		axios.post('methods.asmx/UpsertRegistrant', inputArg)
			.then((response) => {
				dispatch(sendNotification("Registrant checked-in!", true));
				dispatch(updateRegistrantList(response.data.d.AttendeeGuid, true));											
			})
			.catch((err) => {
				dispatch(checkInRegistrantError(err));
			});
	};
}

function checkInRegistrantSuccess(guid) {
	return {
		type : CHECKIN_REGISTRANT_SUCCESS,
		payload : guid
	};
}

function checkInRegistrantError(err) {
	return {
		type : CHECKIN_REGISTRANT_ERROR,
		payload : err
	};
}

export function checkOutRegistrant(registrant) {
	const checkedOutRegistrant = Object.assign({}, registrant, {
		Attended : false,
		FirstCheckInDateTime : null,
		OnSiteModifiedDateTime : (new Date())
	});

	const inputArg = {
		registrant : checkedOutRegistrant
	};

	return function(dispatch) {
		axios.post('methods.asmx/UpsertRegistrant', inputArg)
			.then((response) => {
				dispatch(sendNotification("Registrant checked out!", true));
				dispatch(updateRegistrantList(response.data.d.AttendeeGuid, false));
			})
			.catch((err) => {
				dispatch(checkOutRegistrantError(err));
			});
	};
}

function checkOutRegistrantSuccess(guid) {
	return {
		type : CHECKOUT_REGISTRANT_SUCCESS,
		payload : guid
	};
}

function checkOutRegistrantError(err) {
	return {
		type : CHECKOUT_REGISTRANT_ERROR,
		payload : err
	};
}

function updateRegistrantList(guid, attended) {
	return {
		type : UPDATE_REGISTRANT_LIST,
		guid,
		attended
	};
}

export function upsertRegistrant(registrant) {

	let inputArg = {
		registrant
	};

	return function(dispatch) {
		axios.post(`methods.asmx/UpsertRegistrant`, inputArg)
			.then((response) => {
				dispatch(upsertRegistrantSuccess(response.data.d.AttendeeGuid));
			})
			.catch((err) => {
				dispatch(upsertRegistrantError(err));
			});
	};
}

function upsertRegistrantSuccess(guid) {
	return {
		type : UPSERT_REGISTRANT_SUCCESS,
		payload : guid
	};
}

function upsertRegistrantError(err) {
	return {
		type : UPSERT_REGISTRANT_ERROR,
		payload : err
	};
}

// Not Implemented
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

export function clearCurrentRegistrant() {
	return {
		type : CLEAR_CURRENT_REGISTRANT,
		payload : null
	};
}

export function clearAllSearching() {
	return {
		type: CLEAR_ALL_SEARCHING,
		payload : null
	};
}

export function generateSurveyDataXML(form) {
	let xmlDoc = document.implementation.createDocument(null, "result");
	let docEl = xmlDoc.getElementsByTagName('result');
	let responsesEl = xmlDoc.createElement('responses');
	docEl[0].appendChild(responsesEl);
	if(form){
		Object.keys(form).forEach((field) => {
			if(!Array.isArray(form[field])){
				// Generate text response
				if(field) {
					let xmlField = xmlDoc.createElement(field);
					responsesEl.appendChild(xmlField);
					let textNode = xmlDoc.createTextNode(form[field]);
					xmlField.appendChild(textNode);
				}				
			} else {
				// Generate pickone/many
				form[field].forEach((pickResponse) => {
					if(pickResponse){
						let xmlPick = xmlDoc.createElement(pickResponse);
						responsesEl.appendChild(xmlPick);
					}					
				});
			}
		});
	}
	const serializer = new XMLSerializer();
	const xmlString = serializer.serializeToString(xmlDoc);
	return xmlString;
}

export function Registrant() {
	this.Attended = false;
	this.AttendeeGuid = null;
	this.AttendeeId = null;
	this.AttendeeType = null;
	this.BadgeId = null;
	this.Company = null;
	this.Email = null;
	this.FirstCheckInDateTime = null;
	this.FirstName = null;
	this.FirstPrintDateTime = null;
	this.LastName = null;
	this.OnSiteModifiedDateTime = null;
	this.PrePrint = false;
	this.PreRegistrantionDateTime = null;
	this.Printed = false;
	this.RegistrantId = null;
	this.ScanKey = null;
	this.ServerGuid = null;
	this.ServerName = null;
	this.StationName = null;
	this.SurveyDate = null;
	this.UploadGuid = null;
	this.Uploaded = false;
	this.WalkIn = true;
}