import { axios } from './utilities_httpRequest';
const moment = require('moment');


//------------------------- TYPES -------------------------//

export const GET_REGISTRATION_STATS_SUCCESS = 'GET_REGISTRATION_STATS_SUCCESS';
export const GET_REGISTRATION_STATS_ERROR   = 'GET_REGISTRATION_STATS_ERROR';

export const GET_EVENT_INFORMATION_SUCCESS = 'GET_EVENT_INFORMATION_SUCCESS';
export const GET_EVENT_INFORMATION_ERROR = 'GET_EVENT_INFORMATION_ERROR';

export const GET_EVENT_SETTINGS_SUCCESS = 'GET_EVENT_SETTINGS_SUCCESS';
export const GET_EVENT_SETTINGS_ERROR = 'GET_EVENT_SETTINGS_ERROR';

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


// Release Current Seat
export function releaseThisSeat() {
	return function(dispatch) {
		axios.post(`methods.asmx/ReleaseSeat`, {})
			.then((response) => {
				if(response.data.d.Fault == null){
					// CLEAR STATION INFO...
				}
			})
			.catch((err) => {
				
			});
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