import { axios } from './utilities_httpRequest';

//------------------------- TYPES -------------------------//

export const LOAD_REGISTRANT_ATTENDEEGUID_START = 'LOAD_REGISTRANT_ATTENDEEGUID_START';
export const LOAD_REGISTRANT_ATTENDEEGUID_SUCCESS = 'LOAD_REGISTRANT_ATTENDEEGUID_SUCCESS';
export const LOAD_REGISTRANT_ATTENDEEGUID_ERROR   = 'LOAD_REGISTRANT_ATTENDEEGUID_ERROR';

export const SEARCH_REGISTRANTS_START = 'SEARCH_REGISTRANTS_START';
export const SEARCH_REGISTRANTS_SUCCESS = 'SEARCH_REGISTRANTS_SUCCESS';
export const SEARCH_REGISTRANTS_ERROR = 'SEARCH_REGISTRANTS_ERROR';

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

// Send Notification - message, error/success
export function sendNotification(msg, isSuccess) {
	return {
		type : SEND_NOTIFICATION,
		msg,
		isSuccess
	};
}

// Load Registrant (atGuid) - return registrant object
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

// Searching Registrants - start searchLoading, return list of registrants
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

// Create walk-in registrant - send notification, return to list
export function createWalkIn(registrant) {

	const checkedInRegistrant = Object.assign({}, registrant, {
		Attended : true,
		FirstCheckInDateTime : (new Date()),
		OnSiteModifiedDateTime : (new Date()),
		StationName : (window.localStorage.getItem('stationName'))
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

// Checking IN - send success notification, update registrant list
export function checkInRegistrant(registrant) {
	const checkedInRegistrant = Object.assign({}, registrant, {
		Attended : true,
		FirstCheckInDateTime : (new Date()),
		OnSiteModifiedDateTime : (new Date()),
		StationName : (window.localStorage.getItem('stationName'))
	});

	const inputArg = {
		registrant : checkedInRegistrant
	};

	return function(dispatch) {
		axios.post('methods.asmx/UpsertRegistrant', inputArg)
			.then((response) => {
				dispatch(sendNotification("Thank you for joining us!", true));
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

// Checking OUT - Send success notification and update registrant list
export function checkOutRegistrant(registrant) {
	const checkedOutRegistrant = Object.assign({}, registrant, {
		Attended : false,
		FirstCheckInDateTime : null,
		OnSiteModifiedDateTime : (new Date()),
		StationName : (window.localStorage.getItem('stationName'))
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

// returnToList update, mark registrantList as attended/not attended for UI
function updateRegistrantList(guid, attended) {
	return {
		type : UPDATE_REGISTRANT_LIST,
		guid,
		attended
	};
}

// Clear currentRegistrant
export function clearCurrentRegistrant() {
	return {
		type : CLEAR_CURRENT_REGISTRANT,
		payload : null
	};
}

// Clear currentRegistrant, currentError, registantList, searchError, hasSearched, searchLoading
export function clearAllSearching() {
	return {
		type: CLEAR_ALL_SEARCHING,
		payload : null
	};
}

// Convert form object into survey data xml string
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

// Create an xmlDoc from an xml string
export function parseXml(xmlStr) {
	let xmlDoc;
	if(window.DOMParser) {
		let parser = new DOMParser();
		xmlDoc = parser.parseFromString(xmlStr, 'text/xml');
	} else {
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = false;
		xmlDoc.loadXML(xmlStr);
	}
	return xmlDoc;
}

// Get text value of specific survey data element
export function getTextFromXml(responsesElement, elementId) {
	if (elementId && elementId != "") {
		let existingEl = responsesElement.getElementsByTagName(elementId);
		if((existingEl != null) && (existingEl.length > 0)) {
			let node = existingEl[0];
			let textNode = node.firstChild;
			if(textNode != null) {
				return textNode.textContent;
			}
		}
	}
	return "";
}

// Get T/F if pick value is in survey data
export function getPickFromXml(responsesElement, elementId) {
	if (elementId && elementId != "") {
		let existingEl = responsesElement.getElementsByTagName(elementId);
		if((existingEl != null) && (existingEl.length > 0)) {
			return true;
		}
	}
	return false;
}

// Walk-in Registrant Factory
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