import { axios } from './utilities_httpRequest';
const moment = require('moment');

//------------------------- TYPES -------------------------//

export const GET_REGISTRATION_STATS_SUCCESS = 'GET_REGISTRATION_STATS_SUCCESS';
export const GET_REGISTRATION_STATS_ERROR   = 'GET_REGISTRATION_STATS_ERROR';

export const GET_EVENT_INFORMATION_SUCCESS = 'GET_EVENT_INFORMATION_SUCCESS';
export const GET_EVENT_INFORMATION_ERROR = 'GET_EVENT_INFORMATION_ERROR';

export const GET_EVENT_SETTINGS_SUCCESS = 'GET_EVENT_SETTINGS_SUCCESS';
export const GET_EVENT_SETTINGS_ERROR = 'GET_EVENT_SETTINGS_ERROR';

export const SET_SEAT_GUID = 'SET_SEAT_GUID';
export const CLEAR_SEAT_GUID = 'CLEAR_SEAT_GUID';

export const GET_SEAT_USAGE_SUCCESS = 'GET_SEAT_USAGE_SUCCESS';
export const GET_SEAT_USAGE_ERROR = 'GET_SEAT_USAGE_ERROR';

export const SUBTRACT_SEAT_USE = 'SUBTRACT_SEAT_USE';
export const REMOVE_ACTIVE_SEAT = 'REMOVE_ACTIVE_SEAT';

export const LIST_GRANTED_FEATURES_SUCCESS = 'LIST_GRANTED_FEATURES_SUCCESS';

//-------------------- ACTION CREATORS --------------------//

// Get Registration statistics
export function getRegistrationStats() {
	return function(dispatch) {
		axios.post(`methods.asmx/GetRegistrationStats`, {})
			.then((response) => {
				dispatch(getRegistrationStatsSuccess(response.data.d));
			})
			.catch((err) => {
				dispatch(getRegistrationStatsError(err));
			});
	};
}

function getRegistrationStatsSuccess(response) {
	let stats = Object.assign({}, {
		totalAttended : response.TotalAttended,
		totalRegistered : response.TotalRegistrants,
		walkInsRegistered : response.TotalWalkIn,
		walkInsAttended : response.TotalWalkInAttended
	});

	// Include calculated statistics
	stats.preRegisteredAttended  = (stats.totalAttended - stats.walkInsAttended) || 0;
	stats.preRegisteredTotal = (stats.totalRegistered - stats.walkInsRegistered) || 0;

	return {
		type : GET_REGISTRATION_STATS_SUCCESS,
		payload : stats
	};
}

function getRegistrationStatsError(err) {
	return {
		type : GET_REGISTRATION_STATS_ERROR,
		payload : err
	};
}

// Get demographic information about the event
export function getEventInformation() {
	return function(dispatch) {
		axios.post(`methods.asmx/GetEventInformation`, {})
			.then((response) => {
				dispatch(getEventInformationSuccess(response.data.d.EventInformation));
			})
			.catch((err) => {
				dispatch(getEventInformationError(err));
			});
	};
}

function getEventInformationSuccess(response) {
	let eventInfo = Object.assign({}, {
		eventName : response.Name,
		eventGuid : response.EventGuid
	});

	// Convert location to full string
	let locArr = [response.City, response.StateProvince || response.Country];
	eventInfo.eventLocation = locArr.filter((str) => { return str; }).join(', ');
	eventInfo.eventStartDate = moment(response.StartDate, 'YYYY-MM-DDTHH:mm:ss.SSSSSS').format('MM/DD/YY');
	return {
		type : GET_EVENT_INFORMATION_SUCCESS,
		payload : eventInfo
	};
}

function getEventInformationError(err) {
	return {
		type : GET_EVENT_INFORMATION_ERROR,
		payload : err
	};
}

// Get Event Settings - return configuration object
export function getEventSettings(data) {
	return function(dispatch) {
		axios.post(`methods.asmx/GetEventSettings`, {})
			.then((response) => {
				dispatch(getEventSettingsSuccess(response.data.d.EventSettings.Configuration));
			})
			.catch((err) => {				
				let guid = getGuidFromURL();
				let configStr = window.localStorage.getItem(`config_${guid}`);				
				if(guid && configStr){					
					dispatch(getEventSettingsSuccess(configStr));										
				} else {
					dispatch(getEventSettingsError(err));
				}				
			});
	};
}

function getEventSettingsSuccess(response) {
	let guid = getGuidFromURL();
	let config;
	window.localStorage.setItem(`config_${guid}`, JSON.stringify(response));
	try {
		config = JSON.parse(response);
	} catch(e) {
		return getEventSettingsError(e);
	}	
	return {
		type : GET_EVENT_SETTINGS_SUCCESS,
		payload : config
	};
}

function getEventSettingsError(err) {
	return {
		type : GET_EVENT_SETTINGS_ERROR,
		payload : err
	};
}

// Acquire Seat
export function acquireSeat(station) {
	let guid = getGuidFromURL();
	let stationInformation = `<clientInfo><application>event_${guid}</application><stationName>${station}</stationName></clientInfo>`;
	return axios.post('methods.asmx/AcquireSeat', { stationInformation });
}

// Set Seat Guid
export function setSeatGuid(guid) {
	return {
		type : SET_SEAT_GUID,
		payload : guid
	};
}


// Release Current Seat
export function releaseThisSeat(guid) {
	return function(dispatch) {
		axios.post(`methods.asmx/ReleaseSeat`, {})
			.then((response) => {
				if(response.data.d.Fault == null){
					dispatch(clearSeatGuid());
					dispatch(subtractSeat());
				}
			})
			.catch((err) => {
				
			});
	};
}

function clearSeatGuid() {
	return {
		type: CLEAR_SEAT_GUID
	};
}

function removeActiveSeat(guid) {
	return {
		type: REMOVE_ACTIVE_SEAT,
		payload: guid
	};
}

// Release Other Active Seat
export function releaseOtherSeat(seatGuid) {
	return function(dispatch) {
		axios.post(`methods.asmx/RelinquishSeat`, { seatGuid })
			.then((response) => {
				dispatch(subtractSeat());
			})
			.catch((err) => {

			});
	};
}

function subtractSeat() {
	return {
		type : SUBTRACT_SEAT_USE
	};
}

// Get Seat Usage
export function getSeatUsage() {
	return function(dispatch) {
		axios.post('methods.asmx/GetSeatUsage', {})
			.then((response) => {
				if(response.data.d.Fault && response.data.d.Fault.Type === "InvalidSeatFault"){
					dispatch(clearSeatGuid());
					dispatch(getSeatUsageError(err));
				} else {
					dispatch(getSeatUsageSuccess(response.data.d));
				}				
			})
			.catch((err) => {
				dispatch(getSeatUsageError(err));
			});
	}
}

function getSeatUsageSuccess(response) {
	return {
		type : GET_SEAT_USAGE_SUCCESS,
		payload : response
	};
}

function getSeatUsageError(err) {
	return {
		type : GET_SEAT_USAGE_ERROR,
		payload : err
	};
}

// Get granted features
export function listGrantedFeatures() {
	return function(dispatch) {
		axios.post('methods.asmx/ListFeatureAccesses', {})
			.then((response) => {
				dispatch(listGrantedFeaturesSuccess(response.data.d.FeatureAccesses));
			})
			.catch((err) => {
				// Do nothing...
			});
	}
}

function listGrantedFeaturesSuccess(response) {
	return {
		type: LIST_GRANTED_FEATURES_SUCCESS,
		payload: response
	};
}

// Helper function that returns Event GUID
export function getGuidFromURL(){
	let guid;
	let path = window.location.pathname;
	path = path.slice(0, -1);
	let idx = path.lastIndexOf('/');
	guid = path.slice(idx + 1);
	return guid;
}

// Helper - convert message with placeholders to sms message
export function replaceMessagePlaceholders(msg, surveyData){
	return msg.replace(/\{\{(.*?)\}\}/g, function(match, token) {		
		return extractXMLstring(token, surveyData);
	});
}

// Helper - searches survey data and returns text value
export function extractXMLstring(tag, surveyData) {
	var str = "";
	if(surveyData && tag) {
		tag = tag.trim();
		let regex = new RegExp("<" + tag + ">(.*?)<\/" + tag + ">", "ig");
		let match = regex.exec(surveyData);
		if(match && match.length > 1) {
			str = match[1];
		} 
	}
	return str;
}